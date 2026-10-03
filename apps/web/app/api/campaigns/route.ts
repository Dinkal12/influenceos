export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import { successResponse, errorResponse, paginate } from '@/lib/api'

// GET /api/campaigns  — list campaigns (filterable)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')
    const platform = searchParams.get('platform')

    const filter: Record<string, unknown> = {}
    if (status) filter.status = status
    if (platform) filter.platforms = platform

    // Coordinators see their own campaigns; creators see all active
    const role = (session.user as any).role
    if (role === 'coordinator') {
      filter.coordinator = (session.user as any).id
    } else {
      filter.status = filter.status || 'active'
    }

    const skip = (page - 1) * limit
    const [campaigns, total] = await Promise.all([
      Campaign.find(filter)
        .populate('coordinator', 'name email avatar')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Campaign.countDocuments(filter),
    ])

    return successResponse({ campaigns, pagination: paginate(total, page, limit) })
  } catch (err) {
    console.error('[GET /campaigns]', err)
    return errorResponse('Internal server error', 500)
  }
}

// POST /api/campaigns — create a campaign (coordinator only)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)
    if ((session.user as any).role !== 'coordinator') {
      return errorResponse('Only coordinators can create campaigns', 403)
    }

    await connectDB()

    const body = await req.json()
    const { title, description, brand, budget, platforms, startDate, endDate, maxCreators, requirements, hashtags } = body

    if (!title || !description || !brand || !budget || !startDate || !endDate) {
      return errorResponse('Missing required fields', 400)
    }

    const campaign = await Campaign.create({
      title,
      description,
      brand,
      budget,
      platforms: platforms || ['all'],
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      coordinator: (session.user as any).id,
      maxCreators: maxCreators || 10,
      requirements,
      hashtags: hashtags || [],
    })

    return successResponse(campaign, 201)
  } catch (err) {
    console.error('[POST /campaigns]', err)
    return errorResponse('Internal server error', 500)
  }
}
