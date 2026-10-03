'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'

export const dynamic = 'force-dynamic'

interface Contract {
  _id: string; status: string; agreedRate: number; deliverableCount: number
  startDate: string; dueDate: string
  campaign: { title: string; brand: string }
  creator: { name: string; email: string }
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b', accepted: '#22c55e', active: '#6366f1',
  completed: '#8b5cf6', rejected: '#ef4444', cancelled: '#9ca3af'
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const url = filter === 'all' ? '/api/contracts' : `/api/contracts?status=${filter}`
    fetch(url).then(r => r.json()).then(d => {
      if (d.success) setContracts(d.data.contracts ?? [])
    }).finally(() => setLoading(false))
  }, [filter])

  return (
    <>
      <PortalTopbar title="Contracts" />
      <main className="flex-1 p-6 space-y-5" style={{ background: 'var(--bg)' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Contracts</h2>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{contracts.length} contracts total</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {['all', 'pending', 'accepted', 'active', 'completed', 'rejected'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={{
                background: filter === s ? 'var(--cta-primary)' : 'var(--bg-card)',
                color: filter === s ? 'var(--cta-primary-fg)' : 'var(--fg-muted)',
                border: `1px solid ${filter === s ? 'transparent' : 'var(--border)'}`,
              }}>{s}</button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : contracts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">📄</div>
            <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>No contracts yet</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>Invite creators from the Creators page to create contracts</div>
          </div>
        ) : (
          <div className="space-y-3">
            {contracts.map((c) => (
              <div key={c._id} className="flex items-center justify-between p-4 rounded-2xl gap-4 flex-wrap"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ background: 'var(--icon-bg)', color: 'var(--accent)' }}>
                    {c.creator?.name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{c.creator?.name ?? 'Creator'}</div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{c.campaign?.title ?? 'Campaign'} · {c.campaign?.brand}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="text-center">
                    <div className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>${c.agreedRate?.toLocaleString()}</div>
                    <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>{c.deliverableCount}</div>
                    <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>Deliverables</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium capitalize"
                    style={{ background: `${STATUS_COLORS[c.status] ?? '#888'}18`, color: STATUS_COLORS[c.status] ?? '#888' }}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
