export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import { successResponse, errorResponse } from '@/lib/api'

type Params = { params: { id: string } }

// GET /api/campaigns/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const campaign = await Campaign.findById(params.id)
      .populate('coordinator', 'name email avatar')
      .populate('enrolledCreators', 'name email avatar')
      .lean()

    if (!campaign) return errorResponse('Campaign not found', 404)
    return successResponse(campaign)
  } catch (err) {
    console.error('[GET /campaigns/id]', err)
    return errorResponse('Internal server error', 500)
  }
}

// PUT /api/campaigns/[id]
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const campaign = await Campaign.findById(params.id)
    if (!campaign) return errorResponse('Campaign not found', 404)

    const role = (session.user as any).role
    const userId = (session.user as any).id
    if (role !== 'coordinator' || campaign.coordinator.toString() !== userId) {
      return errorResponse('Forbidden', 403)
    }

    const body = await req.json()
    const allowed = ['title', 'description', 'budget', 'platforms', 'status', 'startDate', 'endDate', 'maxCreators', 'requirements', 'hashtags', 'coverImage']
    allowed.forEach((key) => {
      if (body[key] !== undefined) (campaign as any)[key] = body[key]
    })

    await campaign.save()
    return successResponse(campaign)
  } catch (err) {
    console.error('[PUT /campaigns/id]', err)
    return errorResponse('Internal server error', 500)
  }
}

// DELETE /api/campaigns/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const campaign = await Campaign.findById(params.id)
    if (!campaign) return errorResponse('Campaign not found', 404)

    const role = (session.user as any).role
    const userId = (session.user as any).id
    if (role !== 'coordinator' && role !== 'admin') return errorResponse('Forbidden', 403)
    if (role === 'coordinator' && campaign.coordinator.toString() !== userId) {
      return errorResponse('Forbidden', 403)
    }

    await campaign.deleteOne()
    return successResponse({ message: 'Campaign deleted' })
  } catch (err) {
    console.error('[DELETE /campaigns/id]', err)
    return errorResponse('Internal server error', 500)
  }
}
