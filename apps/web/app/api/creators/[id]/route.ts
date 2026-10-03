export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Creator from '@/models/Creator'
import { successResponse, errorResponse } from '@/lib/api'

type Params = { params: { id: string } }

// GET /api/creators/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const creator = await Creator.findById(params.id)
      .populate('user', 'name email avatar createdAt')
      .lean()

    if (!creator) return errorResponse('Creator not found', 404)
    return successResponse(creator)
  } catch (err) {
    console.error('[GET /creators/id]', err)
    return errorResponse('Internal server error', 500)
  }
}

// PUT /api/creators/[id] — creator updates own profile
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const creator = await Creator.findById(params.id)
    if (!creator) return errorResponse('Creator not found', 404)

    // Only the creator themselves or admin can update
    const userId = (session.user as any).id
    const role = (session.user as any).role
    if (creator.user.toString() !== userId && role !== 'admin') {
      return errorResponse('Forbidden', 403)
    }

    const body = await req.json()
    const allowed = ['bio', 'niche', 'platforms', 'location', 'languages', 'ratePerPost', 'portfolio', 'isAvailable']
    allowed.forEach((key) => {
      if (body[key] !== undefined) (creator as any)[key] = body[key]
    })

    // Recalculate totalFollowers & averageEngagement from platforms
    if (body.platforms) {
      creator.totalFollowers = body.platforms.reduce((s: number, p: any) => s + (p.followers || 0), 0)
      const rates = body.platforms.map((p: any) => p.engagementRate || 0)
      creator.averageEngagement = rates.length ? rates.reduce((a: number, b: number) => a + b, 0) / rates.length : 0
    }

    await creator.save()
    return successResponse(creator)
  } catch (err) {
    console.error('[PUT /creators/id]', err)
    return errorResponse('Internal server error', 500)
  }
}
