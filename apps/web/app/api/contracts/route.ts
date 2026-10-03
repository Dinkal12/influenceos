export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Contract from '@/models/Contract'
import Campaign from '@/models/Campaign'
import Notification from '@/models/Notification'
import { successResponse, errorResponse, paginate } from '@/lib/api'

// GET /api/contracts
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
    if (role === 'coordinator') filter.coordinator = userId
    else filter.creator = userId
    if (status) filter.status = status

    const skip = (page - 1) * limit
    const [contracts, total] = await Promise.all([
      Contract.find(filter)
        .populate('campaign', 'title brand coverImage')
        .populate('creator', 'name email avatar')
        .populate('coordinator', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contract.countDocuments(filter),
    ])

    return successResponse({ contracts, pagination: paginate(total, page, limit) })
  } catch (err) {
    console.error('[GET /contracts]', err)
    return errorResponse('Internal server error', 500)
  }
}

// POST /api/contracts — coordinator invites a creator
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)
    if ((session.user as any).role !== 'coordinator') {
      return errorResponse('Only coordinators can create contracts', 403)
    }

    await connectDB()
    const body = await req.json()
    const { campaignId, creatorId, agreedRate, deliverableCount, terms, startDate, dueDate } = body

    if (!campaignId || !creatorId || !agreedRate || !deliverableCount || !terms || !startDate || !dueDate) {
      return errorResponse('Missing required fields', 400)
    }

    const campaign = await Campaign.findById(campaignId)
    if (!campaign) return errorResponse('Campaign not found', 404)

    const existing = await Contract.findOne({ campaign: campaignId, creator: creatorId })
    if (existing) return errorResponse('Contract already exists for this creator on this campaign', 409)

    const contract = await Contract.create({
      campaign: campaignId,
      creator: creatorId,
      coordinator: (session.user as any).id,
      agreedRate,
      deliverableCount,
      terms,
      startDate: new Date(startDate),
      dueDate: new Date(dueDate),
    })

    // Send notification to creator
    await Notification.create({
      user: creatorId,
      type: 'campaign_invite',
      title: 'New Campaign Invite',
      message: `You've been invited to join "${campaign.title}"`,
      link: `/creator-portal/contracts/${contract._id}`,
    })

    return successResponse(contract, 201)
  } catch (err) {
    console.error('[POST /contracts]', err)
    return errorResponse('Internal server error', 500)
  }
}
