export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Notification from '@/models/Notification'
import { successResponse, errorResponse } from '@/lib/api'

// GET /api/notifications
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const { searchParams } = new URL(req.url)
    const unreadOnly = searchParams.get('unread') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20')

    const filter: Record<string, unknown> = { user: (session.user as any).id }
    if (unreadOnly) filter.isRead = false

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).limit(limit).lean(),
      Notification.countDocuments({ user: (session.user as any).id, isRead: false }),
    ])

    return successResponse({ notifications, unreadCount })
  } catch (err) {
    return errorResponse('Internal server error', 500)
  }
}

// PATCH /api/notifications — mark all as read
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const body = await req.json()

    if (body.markAllRead) {
      await Notification.updateMany(
        { user: (session.user as any).id, isRead: false },
        { isRead: true }
      )
    } else if (body.id) {
      await Notification.findByIdAndUpdate(body.id, { isRead: true })
    }

    return successResponse({ message: 'Updated' })
  } catch (err) {
    return errorResponse('Internal server error', 500)
  }
}
