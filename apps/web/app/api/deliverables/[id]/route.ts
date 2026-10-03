export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Deliverable from '@/models/Deliverable'
import Notification from '@/models/Notification'
import Contract from '@/models/Contract'
import { successResponse, errorResponse } from '@/lib/api'

type Params = { params: { id: string } }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const d = await Deliverable.findById(params.id)
      .populate('campaign', 'title brand')
      .populate('creator', 'name avatar email')
      .lean()
    if (!d) return errorResponse('Deliverable not found', 404)
    return successResponse(d)
  } catch (err) {
    return errorResponse('Internal server error', 500)
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()
    const deliverable = await Deliverable.findById(params.id)
    if (!deliverable) return errorResponse('Deliverable not found', 404)

    const userId = (session.user as any).id
    const role = (session.user as any).role
    const body = await req.json()

    if (role === 'creator') {
      // Creator submits content
      if (deliverable.creator.toString() !== userId) return errorResponse('Forbidden', 403)
      if (body.contentUrl) deliverable.contentUrl = body.contentUrl
      if (body.previewUrl) deliverable.previewUrl = body.previewUrl
      if (body.status === 'submitted') {
        deliverable.status = 'submitted'
        deliverable.submittedAt = new Date()

        const contract = await Contract.findById(deliverable.contract)
        if (contract) {
          await Notification.create({
            user: contract.coordinator,
            type: 'general',
            title: 'Content Submitted',
            message: `A creator submitted content for "${deliverable.title}"`,
            link: `/coordinator-portal/deliverables/${deliverable._id}`,
          })
        }
      }
    } else if (role === 'coordinator') {
      // Coordinator approves / requests revision
      if (['approved', 'rejected', 'revision_requested'].includes(body.status)) {
        deliverable.status = body.status
        if (body.status === 'approved') deliverable.approvedAt = new Date()
        if (body.feedback) deliverable.feedback = body.feedback
        if (body.status === 'revision_requested') deliverable.revisionCount += 1

        const notifType = body.status === 'approved' ? 'deliverable_approved'
          : body.status === 'rejected' ? 'deliverable_rejected'
          : 'deliverable_revision'

        await Notification.create({
          user: deliverable.creator,
          type: notifType,
          title: body.status === 'approved' ? 'Content Approved!' : body.status === 'rejected' ? 'Content Rejected' : 'Revision Requested',
          message: body.feedback || `Your submission for "${deliverable.title}" has been ${body.status.replace('_', ' ')}`,
          link: `/creator-portal/deliverables/${deliverable._id}`,
        })
      }
    }

    await deliverable.save()
    return successResponse(deliverable)
  } catch (err) {
    console.error('[PUT /deliverables/id]', err)
    return errorResponse('Internal server error', 500)
  }
}
