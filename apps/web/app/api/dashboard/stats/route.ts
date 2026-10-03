export const dynamic = 'force-dynamic'

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import Campaign from '@/models/Campaign'
import Contract from '@/models/Contract'
import Deliverable from '@/models/Deliverable'
import Payout from '@/models/Payout'
import Creator from '@/models/Creator'
import { successResponse, errorResponse } from '@/lib/api'

export async function GET(_req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return errorResponse('Unauthorized', 401)

    await connectDB()

    const userId = (session.user as any).id
    const role = (session.user as any).role

    if (role === 'coordinator') {
      const [
        totalCampaigns,
        activeCampaigns,
        totalContracts,
        pendingContracts,
        totalDeliverables,
        approvedDeliverables,
        payouts,
      ] = await Promise.all([
        Campaign.countDocuments({ coordinator: userId }),
        Campaign.countDocuments({ coordinator: userId, status: 'active' }),
        Contract.countDocuments({ coordinator: userId }),
        Contract.countDocuments({ coordinator: userId, status: 'pending' }),
        Deliverable.countDocuments({ contract: { $in: await Contract.find({ coordinator: userId }).distinct('_id') } }),
        Deliverable.countDocuments({ status: 'approved', contract: { $in: await Contract.find({ coordinator: userId }).distinct('_id') } }),
        Payout.aggregate([
          { $match: { coordinator: userId } },
          { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } },
        ]),
      ])

      return successResponse({
        totalCampaigns,
        activeCampaigns,
        totalContracts,
        pendingContracts,
        totalDeliverables,
        approvedDeliverables,
        totalPaid: payouts[0]?.total || 0,
        payoutCount: payouts[0]?.count || 0,
      })
    }

    if (role === 'creator') {
      const [
        totalContracts,
        activeContracts,
        pendingDeliverables,
        completedDeliverables,
        earnings,
      ] = await Promise.all([
        Contract.countDocuments({ creator: userId }),
        Contract.countDocuments({ creator: userId, status: 'active' }),
        Deliverable.countDocuments({ creator: userId, status: { $in: ['pending', 'in_progress'] } }),
        Deliverable.countDocuments({ creator: userId, status: 'approved' }),
        Payout.aggregate([
          { $match: { creator: userId, status: 'completed' } },
          { $group: { _id: null, total: { $sum: '$amount' } } },
        ]),
      ])

      return successResponse({
        totalContracts,
        activeContracts,
        pendingDeliverables,
        completedDeliverables,
        totalEarnings: earnings[0]?.total || 0,
      })
    }

    return errorResponse('Unknown role', 400)
  } catch (err) {
    console.error('[GET /dashboard/stats]', err)
    return errorResponse('Internal server error', 500)
  }
}
