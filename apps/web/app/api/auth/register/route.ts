export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import Creator from '@/models/Creator'
import { successResponse, errorResponse } from '@/lib/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Turn thrown errors into an actionable response instead of a blanket 500,
// so the exact failure (missing env, unreachable DB, bad input) is visible.
function classifyError(err: unknown): { status: number; message: string } {
  const e = err as { name?: string; code?: unknown; message?: string }
  const name = e?.name || ''
  const message = e?.message || String(err)

  if (message.includes('MONGODB_URI')) {
    return { status: 500, message: 'Server configuration error: MONGODB_URI is not set' }
  }
  if (name === 'ValidationError') {
    const details = (err as { errors?: Record<string, { message: string }> }).errors
    const joined = details ? Object.values(details).map((v) => v.message).join(' ') : ''
    return { status: 400, message: joined || 'Invalid input' }
  }
  if (e?.code === 11000 || message.includes('duplicate key')) {
    return { status: 409, message: 'Email already in use' }
  }
  if (
    name.includes('Authentication') ||
    e?.code === 18 ||
    /Authentication failed|bad auth/i.test(message)
  ) {
    return {
      status: 503,
      message: 'Database authentication failed — check the username and password in MONGODB_URI',
    }
  }
  const looksLikeNetwork =
    name.includes('ServerSelection') ||
    name.includes('Network') ||
    name.includes('Timeout') ||
    /ECONNREFUSED|ENOTFOUND|EAI_AGAIN|ETIMEDOUT|EHOSTUNREACH|querySrv|getaddrinfo|Server selection timed out/i.test(message)
  if (looksLikeNetwork) {
    return {
      status: 503,
      message: 'Could not reach the database — check MONGODB_URI and the database IP allowlist',
    }
  }
  return { status: 500, message: 'Something went wrong creating your account' }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password, role } = body

    if (!name || !email || !password) {
      return errorResponse('Name, email and password are required', 400)
    }
    if (!EMAIL_RE.test(String(email))) {
      return errorResponse('Enter a valid email address', 400)
    }
    if (String(password).length < 6) {
      return errorResponse('Password must be at least 6 characters', 400)
    }

    await connectDB()

    const existing = await User.findOne({ email: String(email).toLowerCase() })
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
    const { status, message } = classifyError(err)
    return errorResponse(message, status)
  }
}
