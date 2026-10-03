'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'

export const dynamic = 'force-dynamic'

interface Creator {
  _id: string
  user: { name: string; email: string; avatar?: string }
  niche: string[]; platforms: { name: string; followers: number }[]
  totalFollowers: number; averageEngagement: number; rating: number; ratePerPost: number; isAvailable: boolean
}

export default function CreatorsPage() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/creators?limit=20').then(r => r.json()).then(d => {
      if (d.success) setCreators(d.data.creators ?? [])
    }).finally(() => setLoading(false))
  }, [])

  const filtered = creators.filter(c =>
    c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.niche?.some((n: string) => n.toLowerCase().includes(search.toLowerCase()))
  )

  const fmt = (n: number) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n

  return (
    <>
      <PortalTopbar title="Creators" />
      <main className="flex-1 p-6 space-y-5" style={{ background: 'var(--bg)' }}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Creator Marketplace</h2>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Find and invite creators to your campaigns</p>
          </div>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search creators or niche…"
              className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-64"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg)' }}
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">👥</div>
            <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>No creators found</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>Creators will appear here once they sign up</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c._id} className="p-5 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                    style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>
                    {c.user?.name?.[0]?.toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{c.user?.name ?? 'Unknown'}</div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>{c.user?.email}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ background: c.isAvailable ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.1)', color: c.isAvailable ? '#22c55e' : '#ef4444' }}>
                      {c.isAvailable ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'Followers', val: fmt(c.totalFollowers ?? 0) },
                    { label: 'Engagement', val: `${(c.averageEngagement ?? 0).toFixed(1)}%` },
                    { label: 'Rate/Post', val: `$${c.ratePerPost ?? 0}` },
                  ].map((s) => (
                    <div key={s.label} className="text-center p-2 rounded-xl" style={{ background: 'var(--bg)' }}>
                      <div className="text-sm font-bold" style={{ color: 'var(--fg)' }}>{s.val}</div>
                      <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {c.niche?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.niche.slice(0, 3).map((n: string) => (
                      <span key={n} className="px-2 py-0.5 rounded-full text-[10px]"
                        style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--fg-muted)' }}>{n}</span>
                    ))}
                  </div>
                )}
                <button className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
                  style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
                  Invite to Campaign
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
