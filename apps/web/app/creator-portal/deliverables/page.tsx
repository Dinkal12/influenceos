'use client'
import { useEffect, useState } from 'react'
import PortalTopbar from '@/components/layout/PortalTopbar'

export const dynamic = 'force-dynamic'

interface Deliverable {
  _id: string; title: string; type: string; platform: string
  status: string; dueDate: string; feedback?: string
  campaign: { title: string; brand: string }
}

const STATUS_COLORS: Record<string, string> = {
  pending: '#9ca3af', in_progress: '#f59e0b', submitted: '#6366f1',
  approved: '#22c55e', rejected: '#ef4444', revision_requested: '#f97316'
}

export default function DeliverablesPage() {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState<string | null>(null)
  const [url, setUrl] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/deliverables?limit=20').then(r => r.json()).then(d => {
      if (d.success) setDeliverables(d.data.deliverables ?? [])
    }).finally(() => setLoading(false))
  }, [])

  const submitContent = async (id: string) => {
    if (!url[id]?.trim()) return
    setSubmitting(id)
    const res = await fetch(`/api/deliverables/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentUrl: url[id], status: 'submitted' }),
    })
    const data = await res.json()
    if (data.success) {
      setDeliverables((prev) => prev.map((d) => d._id === id ? { ...d, status: 'submitted' } : d))
    }
    setSubmitting(null)
  }

  return (
    <>
      <PortalTopbar title="Deliverables" />
      <main className="flex-1 p-6 space-y-5" style={{ background: 'var(--bg)' }}>
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>My Deliverables</h2>
          <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Submit your content and track review status</p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 rounded-2xl animate-pulse" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }} />
            ))}
          </div>
        ) : deliverables.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-4xl mb-3">📋</div>
            <div className="text-sm font-medium" style={{ color: 'var(--fg)' }}>No deliverables yet</div>
            <div className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>Accept contracts to receive deliverable tasks</div>
          </div>
        ) : (
          <div className="space-y-4">
            {deliverables.map((d) => (
              <div key={d._id} className="p-5 rounded-2xl space-y-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{d.title}</div>
                    <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                      {d.campaign?.title} · {d.campaign?.brand} · {d.platform} · Due: {new Date(d.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium capitalize whitespace-nowrap flex-shrink-0"
                    style={{ background: `${STATUS_COLORS[d.status] ?? '#888'}18`, color: STATUS_COLORS[d.status] ?? '#888' }}>
                    {d.status.replace('_', ' ')}
                  </span>
                </div>

                {d.feedback && (
                  <div className="px-3 py-2 rounded-xl text-xs italic" style={{ background: 'var(--bg)', color: 'var(--fg-muted)', border: '1px solid var(--border)' }}>
                    💬 Feedback: {d.feedback}
                  </div>
                )}

                {(d.status === 'pending' || d.status === 'in_progress' || d.status === 'revision_requested') && (
                  <div className="flex gap-2">
                    <input
                      value={url[d._id] ?? ''}
                      onChange={(e) => setUrl((prev) => ({ ...prev, [d._id]: e.target.value }))}
                      placeholder="Paste your content URL (e.g. https://instagram.com/p/...)"
                      className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                    />
                    <button onClick={() => submitContent(d._id)} disabled={submitting === d._id || !url[d._id]}
                      className="px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
                      {submitting === d._id ? '…' : 'Submit'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
