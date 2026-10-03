'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'

export const dynamic = 'force-dynamic'

interface Payout {
  _id: string; amount: number; currency: string; status: string; method: string
  campaign: { title: string; brand: string }
  processedAt?: string; createdAt: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b', processing: '#6366f1', completed: '#22c55e', failed: '#ef4444'
}

export default function EarningsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const total = payouts.filter(p => p.status === 'completed').reduce((s, p) => s + p.amount, 0)
  const pending = payouts.filter(p => p.status !== 'completed').reduce((s, p) => s + p.amount, 0)

  useEffect(() => {
    fetch('/api/payouts?limit=50').then(r => r.json()).then(d => {
      if (d.success) setPayouts(d.data.payouts ?? [])
    }).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PortalTopbar title="Earnings" />
      <main className="flex-1 p-6 space-y-5" style={{ background: 'var(--bg)' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Earnings & Payouts</h2>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Your complete payout history</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Earned', value: `$${total.toLocaleString()}`, accent: true },
            { label: 'Pending', value: `$${pending.toLocaleString()}` },
            { label: 'Transactions', value: payouts.length },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--fg-subtle)' }}>{s.label}</div>
              <div className="text-2xl font-bold" style={{ color: s.accent ? 'var(--accent)' : 'var(--fg)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Payout list */}
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : payouts.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">💰</div>
            <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>No payouts yet</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>Payouts are processed after your content is approved</div>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-5 px-5 py-3 text-[11px] uppercase tracking-widest"
              style={{ background: 'var(--bg-card)', color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border)' }}>
              <div className="col-span-2">Campaign</div><div>Amount</div><div>Method</div><div>Status</div>
            </div>
            {payouts.map((p, i) => (
              <div key={p._id} className="grid grid-cols-5 px-5 py-4 items-center"
                style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-card)', borderBottom: i < payouts.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="col-span-2">
                  <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{p.campaign?.title ?? 'Campaign'}</div>
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="text-sm font-bold" style={{ color: 'var(--accent)' }}>${p.amount.toLocaleString()}</div>
                <div className="text-xs capitalize" style={{ color: 'var(--fg-muted)' }}>{p.method?.replace('_', ' ')}</div>
                <span className="inline-flex px-2.5 py-1 rounded-full text-[10px] font-medium capitalize"
                  style={{ background: `${STATUS_COLORS[p.status] ?? '#888'}18`, color: STATUS_COLORS[p.status] ?? '#888' }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
