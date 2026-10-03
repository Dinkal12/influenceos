'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Campaign {
  _id: string; title: string; brand: string
  status: string; budget: number; spent: number
  platforms: string[]; startDate: string; endDate: string
  enrolledCreators: string[]
}

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e', draft: '#f59e0b', completed: '#6366f1', paused: '#ef4444'
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const url = filter === 'all' ? '/api/campaigns' : `/api/campaigns?status=${filter}`
    fetch(url).then(r => r.json()).then(d => { if (d.success) setCampaigns(d.data.campaigns ?? []) }).finally(() => setLoading(false))
  }, [filter])

  return (
    <>
      <PortalTopbar title="Campaigns" />
      <main className="flex-1 p-6 space-y-5" style={{ background: 'var(--bg)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Campaigns</h2>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>{campaigns.length} campaigns found</p>
          </div>
          <Link href="/coordinator-portal/campaigns/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Campaign
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap">
          {['all', 'draft', 'active', 'completed', 'paused'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className="px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all"
              style={{
                background: filter === s ? 'var(--cta-primary)' : 'var(--bg-card)',
                color: filter === s ? 'var(--cta-primary-fg)' : 'var(--fg-muted)',
                border: `1px solid ${filter === s ? 'transparent' : 'var(--border)'}`,
              }}>{s}</button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">📂</div>
            <div className="text-sm font-medium mb-1" style={{ color: 'var(--fg)' }}>No campaigns yet</div>
            <div className="text-xs mb-4" style={{ color: 'var(--fg-muted)' }}>Create your first campaign to get started</div>
            <Link href="/coordinator-portal/campaigns/new"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
              style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
              Create Campaign
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <div className="grid grid-cols-6 px-5 py-3 text-[11px] uppercase tracking-widest"
              style={{ background: 'var(--bg-card)', color: 'var(--fg-subtle)', borderBottom: '1px solid var(--border)' }}>
              <div className="col-span-2">Campaign</div><div>Status</div><div>Budget</div><div>Creators</div><div>Actions</div>
            </div>
            {campaigns.map((c, i) => (
              <div key={c._id} className="grid grid-cols-6 px-5 py-4 items-center transition-colors hover:opacity-90"
                style={{ background: i % 2 === 0 ? 'var(--bg)' : 'var(--bg-card)', borderBottom: i < campaigns.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="col-span-2">
                  <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{c.title}</div>
                  <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{c.brand}</div>
                </div>
                <div>
                  <span className="px-2 py-0.5 rounded-full text-[11px] capitalize font-medium"
                    style={{ background: `${STATUS_COLORS[c.status] ?? '#888'}20`, color: STATUS_COLORS[c.status] ?? '#888' }}>
                    {c.status}
                  </span>
                </div>
                <div className="text-sm" style={{ color: 'var(--fg)' }}>
                  ${c.budget.toLocaleString()}
                  <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>spent: ${(c.spent ?? 0).toLocaleString()}</div>
                </div>
                <div className="text-sm" style={{ color: 'var(--fg)' }}>{c.enrolledCreators?.length ?? 0}</div>
                <div>
                  <Link href={`/coordinator-portal/campaigns/${c._id}`}
                    className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                    style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
