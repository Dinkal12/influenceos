export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Creator from '@/models/Creator'
import { successResponse, errorResponse } from '@/lib/api'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return errorResponse('Name, email and password are required', 400)
    }
    if (password.length < 6) {
      return errorResponse('Password must be at least 6 characters', 400)
    }

    await connectDB()

    const existing = await User.findOne({ email })
    if (existing) return errorResponse('Email already in use', 409)

    const user = await User.create({ name, email, password, role: role || 'creator' })

    // Auto-create empty Creator profile if role is creator
    if (user.role === 'creator') {
      await Creator.create({ user: user._id })
    }

    return successResponse(
      { id: user._id, name: user.name, email: user.email, role: user.role },
      201
    )
  } catch (err: unknown) {
    console.error('[REGISTER]', err)
    return errorResponse('Internal server error', 500)
  }
}
