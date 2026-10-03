'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Stats {
  totalContracts: number; activeContracts: number
  pendingDeliverables: number; completedDeliverables: number; totalEarnings: number
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className="p-5 rounded-2xl" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>{label}</div>
      <div className="text-3xl font-bold" style={{ color: accent ? 'var(--accent)' : 'var(--fg)' }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{sub}</div>}
    </div>
  )
}

export default function CreatorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/stats').then(r => r.json()).then(d => {
      if (d.success) setStats(d.data)
    }).finally(() => setLoading(false))
  }, [])

  const quickLinks = [
    { label: 'Browse Campaigns', href: '/creator-portal/campaigns', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { label: 'My Contracts', href: '/creator-portal/contracts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Deliverables', href: '/creator-portal/deliverables', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { label: 'Earnings', href: '/creator-portal/earnings', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  ]

  return (
    <>
      <PortalTopbar title="Creator Dashboard" />
      <main className="flex-1 p-6 space-y-6" style={{ background: 'var(--bg)' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Welcome back 👋</h2>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Here's what's happening with your creator account</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="Total Contracts" value={stats.totalContracts} sub={`${stats.activeContracts} active`} />
            <StatCard label="Active" value={stats.activeContracts} sub="in progress" />
            <StatCard label="Pending Tasks" value={stats.pendingDeliverables} sub="need attention" />
            <StatCard label="Completed" value={stats.completedDeliverables} sub="approved posts" />
            <StatCard label="Total Earnings" value={`$${stats.totalEarnings.toLocaleString()}`} accent />
          </div>
        ) : (
          <div className="p-6 rounded-2xl text-center text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
            Connect MongoDB to see your live stats
          </div>
        )}

        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((a) => (
              <Link key={a.label} href={a.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all duration-200 hover:scale-[1.02]"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--icon-bg)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d={a.icon} />
                  </svg>
                </div>
                <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips banner */}
        <div className="p-5 rounded-2xl" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)' }}>
          <div className="text-sm font-semibold mb-1" style={{ color: 'var(--fg)' }}>💡 Getting started</div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
            Browse active campaigns, accept contracts from coordinators, then submit your content for review. Once approved, payouts are processed automatically.
          </div>
        </div>
      </main>
    </>
  )
}
