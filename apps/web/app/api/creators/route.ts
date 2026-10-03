export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Creator from '@/models/Creator'
import { successResponse, errorResponse, paginate } from '@/lib/api'

// GET /api/creators — searchable, paginated creator list
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()

    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const niche = searchParams.get('niche')
    const minFollowers = searchParams.get('minFollowers')
    const available = searchParams.get('available')

    const filter: Record<string, unknown> = {}
    if (niche) filter.niche = { $in: [niche] }
    if (minFollowers) filter.totalFollowers = { $gte: parseInt(minFollowers) }
    if (available === 'true') filter.isAvailable = true

    const skip = (page - 1) * limit
    const [creators, total] = await Promise.all([
      Creator.find(filter)
        .populate('user', 'name email avatar')
        .sort({ rating: -1, totalFollowers: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Creator.countDocuments(filter),
    ])

    return successResponse({ creators, pagination: paginate(total, page, limit) })
  } catch (err) {
    console.error('[GET /creators]', err)
    return errorResponse('Internal server error', 500)
  }
}
