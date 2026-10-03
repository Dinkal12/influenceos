'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Stats {
  totalCampaigns: number; activeCampaigns: number
  totalContracts: number; pendingContracts: number
  totalDeliverables: number; approvedDeliverables: number
  totalPaid: number; payoutCount: number
}

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: boolean }) {
  return (
    <div className="p-5 rounded-2xl transition-all duration-300"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      <div className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>{label}</div>
      <div className="text-3xl font-bold" style={{ color: accent ? 'var(--accent)' : 'var(--fg)' }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>{sub}</div>}
    </div>
  )
}

export default function CoordinatorDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data) })
      .finally(() => setLoading(false))
  }, [])

  const quickActions = [
    { label: 'New Campaign', href: '/coordinator-portal/campaigns/new', icon: 'M12 4v16m8-8H4' },
    { label: 'Browse Creators', href: '/coordinator-portal/creators', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { label: 'View Contracts', href: '/coordinator-portal/contracts', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { label: 'Manage Payouts', href: '/coordinator-portal/payouts', icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
  ]

  return (
    <>
      <PortalTopbar title="Dashboard" />
      <main className="flex-1 p-6 space-y-6" style={{ background: 'var(--bg)' }}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Coordinator Dashboard</h2>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Overview of all your campaigns and creator activity</p>
          </div>
          <Link href="/coordinator-portal/campaigns/new"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            New Campaign
          </Link>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-5 rounded-2xl animate-pulse h-28" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Campaigns" value={stats.totalCampaigns} sub={`${stats.activeCampaigns} active`} />
            <StatCard label="Contracts" value={stats.totalContracts} sub={`${stats.pendingContracts} pending`} />
            <StatCard label="Deliverables" value={stats.totalDeliverables} sub={`${stats.approvedDeliverables} approved`} />
            <StatCard label="Total Paid Out" value={`$${stats.totalPaid.toLocaleString()}`} sub={`${stats.payoutCount} payouts`} accent />
          </div>
        ) : (
          <div className="p-6 rounded-2xl text-center text-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
            Connect MongoDB to see live stats
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--fg)' }}>Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all duration-200 hover:scale-[1.02]"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
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

        {/* Getting started banner if no DB */}
        <div className="p-5 rounded-2xl" style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)' }}>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--fg)' }}>Connect your MongoDB to unlock all features</div>
              <div className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                Add <code className="px-1 py-0.5 rounded text-[11px]" style={{ background: 'var(--bg-card)' }}>MONGODB_URI</code>, {' '}
                <code className="px-1 py-0.5 rounded text-[11px]" style={{ background: 'var(--bg-card)' }}>NEXTAUTH_SECRET</code>, and {' '}
                <code className="px-1 py-0.5 rounded text-[11px]" style={{ background: 'var(--bg-card)' }}>NEXTAUTH_URL</code> to your <code className="px-1 py-0.5 rounded text-[11px]" style={{ background: 'var(--bg-card)' }}>.env.local</code> file.
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
