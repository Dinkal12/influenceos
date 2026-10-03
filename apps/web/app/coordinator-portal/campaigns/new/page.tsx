'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PortalTopbar from '@/components/layout/PortalTopbar'
import { AuthInput } from '@/components/auth/AuthInput'

export const dynamic = 'force-dynamic'

const PLATFORMS = ['Instagram', 'TikTok', 'YouTube', 'Twitter', 'LinkedIn', 'Snapchat']

export default function NewCampaignPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    title: '', brand: '', description: '', budget: '', maxCreators: '10',
    startDate: '', endDate: '', requirements: '', hashtags: '',
  })
  const [platforms, setPlatforms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const togglePlatform = (p: string) =>
    setPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.brand || !form.budget || !form.startDate || !form.endDate) {
      setError('Please fill all required fields'); return
    }
    if (platforms.length === 0) { setError('Select at least one platform'); return }
    setError(''); setLoading(true)

    const res = await fetch('/api/campaigns', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        budget: Number(form.budget),
        maxCreators: Number(form.maxCreators),
        platforms,
        hashtags: form.hashtags.split(',').map((h) => h.trim()).filter(Boolean),
      }),
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) router.push('/coordinator-portal/campaigns')
    else setError(data.error ?? 'Failed to create campaign')
  }

  return (
    <>
      <PortalTopbar title="New Campaign" />
      <main className="flex-1 p-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--fg)' }}>Create Campaign</h2>
            <p className="text-sm" style={{ color: 'var(--fg-muted)' }}>Set up a new influencer campaign brief</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--fg-subtle)' }}>Campaign Details</div>
              <AuthInput label="Campaign Title *" type="text" placeholder="e.g. Summer Launch 2024" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <AuthInput label="Brand Name *" type="text" placeholder="e.g. NovaBrand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Description *</label>
                <textarea
                  rows={4} placeholder="Describe the campaign goals, tone, and target audience..."
                  value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--fg-muted)' }}>Requirements</label>
                <textarea rows={2} placeholder="Specific requirements for creators..."
                  value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                  style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--fg-subtle)' }}>Budget & Timeline</div>
              <div className="grid grid-cols-2 gap-4">
                <AuthInput label="Total Budget ($) *" type="number" placeholder="5000" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                <AuthInput label="Max Creators" type="number" placeholder="10" value={form.maxCreators} onChange={(e) => setForm({ ...form, maxCreators: e.target.value })} />
                <AuthInput label="Start Date *" type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                <AuthInput label="End Date *" type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
              </div>
              <AuthInput label="Hashtags (comma-separated)" type="text" placeholder="#summervibes, #novabrand" value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} />
            </div>

            <div className="p-5 rounded-2xl space-y-4" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
              <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--fg-subtle)' }}>Target Platforms *</div>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => (
                  <button key={p} type="button" onClick={() => togglePlatform(p)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: platforms.includes(p) ? 'var(--cta-primary)' : 'var(--bg)',
                      color: platforms.includes(p) ? 'var(--cta-primary-fg)' : 'var(--fg-muted)',
                      border: `1px solid ${platforms.includes(p) ? 'transparent' : 'var(--border)'}`,
                    }}>{p}</button>
                ))}
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-400 px-4 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => router.back()}
                className="flex-1 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}>
                Cancel
              </button>
              <button type="submit" disabled={loading}
                className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}>
                {loading ? 'Creating…' : 'Create Campaign'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
