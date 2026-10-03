// Background worker: delivers email and in-app notifications
async function runNotifications() {
  console.log('[Worker] Sending notifications...')
  // TODO: Process notification queue and dispatch via Resend/SendGrid
}

runNotifications().catch(console.error)
