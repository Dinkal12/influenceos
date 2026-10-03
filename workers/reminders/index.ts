// Background worker: sends due-date and contract reminders
import { prisma } from '@influencer/database'

async function runReminders() {
  console.log('[Worker] Running reminders job...')
  // TODO: Query upcoming deadlines and send notifications
}

runReminders().catch(console.error)
