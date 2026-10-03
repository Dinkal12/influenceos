export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Payout from '@/models/Payout'
import Campaign from '@/models/Campaign'
import Notification from '@/models/Notification'
import { successResponse, errorResponse, paginate } from '@/lib/api'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const userId = (session.user as any).id
    const role = (session.user as any).role

    const filter: Record<string, unknown> = {}
    if (role === 'creator') filter.creator = userId
    else if (role === 'coordinator') filter.coordinator = userId
    if (status) filter.status = status

    const skip = (page - 1) * limit
    const [payouts, total] = await Promise.all([
      Payout.find(filter)
        .populate('campaign', 'title brand')
        .populate('creator', 'name email avatar')
        .populate('deliverable', 'title type')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Payout.countDocuments(filter),
    ])

    return successResponse({ payouts, pagination: paginate(total, page, limit) })
  } catch (err) {
    return errorResponse('Internal server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)
    if ((session.user as any).role !== 'coordinator') {
      return errorResponse('Only coordinators can initiate payouts', 403)
    }

    await connectDB()
    const body = await req.json()
    const { contractId, deliverableId, creatorId, campaignId, amount, method, currency } = body

    if (!contractId || !deliverableId || !creatorId || !campaignId || !amount || !method) {
      return errorResponse('Missing required fields', 400)
    }

    const payout = await Payout.create({
      contract: contractId,
      deliverable: deliverableId,
      creator: creatorId,
      coordinator: (session.user as any).id,
      campaign: campaignId,
      amount,
      method,
      currency: currency || 'USD',
      status: 'processing',
    })

    // Update campaign spent amount
    await Campaign.findByIdAndUpdate(campaignId, { $inc: { spent: amount } })

    // Notify creator
    await Notification.create({
      user: creatorId,
      type: 'payout_sent',
      title: 'Payment Initiated',
      message: `A payment of ${currency || 'USD'} ${amount} has been initiated for your work`,
      link: `/creator-portal/payouts`,
    })

    return successResponse(payout, 201)
  } catch (err) {
    console.error('[POST /payouts]', err)
    return errorResponse('Internal server error', 500)
  }
}
