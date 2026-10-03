export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Deliverable from '@/models/Deliverable'
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
    const contractId = searchParams.get('contractId')

    const userId = (session.user as any).id
    const role = (session.user as any).role

    const filter: Record<string, unknown> = {}
    if (role === 'creator') filter.creator = userId
    if (status) filter.status = status
    if (contractId) filter.contract = contractId

    const skip = (page - 1) * limit
    const [deliverables, total] = await Promise.all([
      Deliverable.find(filter)
        .populate('campaign', 'title brand')
        .populate('creator', 'name avatar')
        .sort({ dueDate: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Deliverable.countDocuments(filter),
    ])

    return successResponse({ deliverables, pagination: paginate(total, page, limit) })
  } catch (err) {
    console.error('[GET /deliverables]', err)
    return errorResponse('Internal server error', 500)
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)
    if ((session.user as any).role !== 'coordinator') {
      return errorResponse('Only coordinators can create deliverables', 403)
    }

    await connectDB()
    const body = await req.json()
    const { contractId, campaignId, creatorId, type, title, description, platform, dueDate } = body

    if (!contractId || !campaignId || !creatorId || !type || !title || !platform || !dueDate) {
      return errorResponse('Missing required fields', 400)
    }

    const deliverable = await Deliverable.create({
      contract: contractId,
      campaign: campaignId,
      creator: creatorId,
      type,
      title,
      description,
      platform,
      dueDate: new Date(dueDate),
    })

    return successResponse(deliverable, 201)
  } catch (err) {
    console.error('[POST /deliverables]', err)
    return errorResponse('Internal server error', 500)
  }
}
