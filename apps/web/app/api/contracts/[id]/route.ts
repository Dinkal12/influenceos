export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Contract from '@/models/Contract'
import Notification from '@/models/Notification'
import { successResponse, errorResponse } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const contract = await Contract.findById(params.id)
      .populate('campaign', 'title brand coverImage startDate endDate')
      .populate('creator', 'name email avatar')
      .populate('coordinator', 'name email avatar')
      .lean()

    if (!contract) return errorResponse('Contract not found', 404)
    return successResponse(contract)
  } catch (err) {
    console.error('[GET /contracts/id]', err)
    return errorResponse('Internal server error', 500)
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const contract = await Contract.findById(params.id).populate('campaign', 'title')
    if (!contract) return errorResponse('Contract not found', 404)

    const userId = (session.user as any).id
    const role = (session.user as any).role
    const body = await req.json()
    const { status, notes } = body

    // Creator can only accept/reject
    if (role === 'creator') {
      if (contract.creator.toString() !== userId) return errorResponse('Forbidden', 403)
      if (!['accepted', 'rejected'].includes(status)) {
        return errorResponse('Creators can only accept or reject', 400)
      }
      contract.status = status
      if (status === 'accepted') contract.acceptedAt = new Date()

      // Notify coordinator
      await Notification.create({
        user: contract.coordinator,
        type: status === 'accepted' ? 'contract_accepted' : 'contract_rejected',
        title: `Contract ${status === 'accepted' ? 'Accepted' : 'Rejected'}`,
        message: `A creator has ${status} your contract for "${(contract.campaign as any).title}"`,
        link: `/coordinator-portal/contracts/${contract._id}`,
      })
    } else if (role === 'coordinator') {
      if (contract.coordinator.toString() !== userId) return errorResponse('Forbidden', 403)
      if (status) contract.status = status
      if (notes) contract.notes = notes
      if (status === 'completed') contract.completedAt = new Date()
    } else {
      return errorResponse('Forbidden', 403)
    }

    await contract.save()
    return successResponse(contract)
  } catch (err) {
    console.error('[PUT /contracts/id]', err)
    return errorResponse('Internal server error', 500)
  }
}
