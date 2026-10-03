// Background worker: processes payment status updates
import { prisma } from '@influencer/database'

async function runPayouts() {
  console.log('[Worker] Processing payout statuses...')
  // TODO: Poll Stripe for pending payout status updates
}

runPayouts().catch(console.error)
