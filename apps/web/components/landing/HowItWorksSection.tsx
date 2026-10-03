'use client'

const steps = [
  {
    num: '01', title: 'Choose Creators',
    desc: 'Select from our verified creator marketplace or bring your own. Filter by niche, audience size, and engagement.',
    detail: (
      <div className="mt-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
        <div className="px-4 py-3 flex items-center gap-2" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="w-2 h-2 rounded-full" style={{ background: 'var(--fg-subtle)' }} />
          <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Creator Search</span>
        </div>
        <div className="p-4 space-y-2">
          {['@alex.creates — 2.1M', '@brandify.co — 890K', '@thetrendlab — 1.4M', '@visual_drops — 560K'].map((c) => (
            <div key={c} className="flex items-center gap-3 p-2 rounded-lg transition-colors cursor-pointer" style={{ background: 'var(--badge-bg)' }}>
              <div className="w-6 h-6 rounded-full flex-shrink-0" style={{ background: 'var(--border)' }} />
              <span className="text-xs" style={{ color: 'var(--fg-muted)' }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '02', title: 'Deploy Campaign',
    desc: 'Spin up a campaign with smart contract terms. Set deliverables, timelines, and budget.',
    detail: (
      <div className="mt-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Campaign Brief</span>
        </div>
        <div className="p-4 space-y-3">
          {[{ label: 'Budget', val: '$12,000' }, { label: 'Duration', val: '30 days' }, { label: 'Platforms', val: 'IG · TT · YT' }, { label: 'Deliverables', val: '3 posts / creator' }].map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>{r.label}</span>
              <span className="text-xs font-medium" style={{ color: 'var(--fg)' }}>{r.val}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    num: '03', title: 'Register + Publish',
    desc: 'Creators accept terms on-chain. Content is reviewed, approved, and published with full tracking.',
    detail: (
      <div className="mt-4 rounded-xl p-4" style={{ border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
        <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-2)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <div>
            <div className="text-xs font-medium" style={{ color: 'var(--fg)' }}>Campaign Live</div>
            <div className="text-[10px]" style={{ color: 'var(--fg-subtle)' }}>3 creators onboarded · Content approved</div>
          </div>
        </div>
        <div className="mt-3 text-xs italic px-1" style={{ color: 'var(--fg-subtle)' }}>Give any command...</div>
      </div>
    ),
  },
  {
    num: '04', title: 'Playground Mode',
    desc: 'Test, simulate, and iterate on campaigns in a sandboxed environment before going live.',
    detail: (
      <div className="mt-4 rounded-xl overflow-hidden font-mono" style={{ border: '1px solid var(--border)', background: 'var(--code-bg)' }}>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
          <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>Sandbox Terminal</span>
        </div>
        <div className="p-4 space-y-1.5">
          {[
            { prompt: '$', cmd: 'simulate campaign --creators 5', c: 'var(--accent)' },
            { prompt: '>', cmd: 'Projecting reach: 4.2M impressions', c: 'var(--fg-muted)' },
            { prompt: '>', cmd: 'Est. engagement: 3.8%', c: 'var(--fg-muted)' },
            { prompt: '$', cmd: 'deploy --env staging', c: 'var(--accent)' },
          ].map((l, i) => (
            <div key={i} className="flex gap-2 text-[11px]">
              <span style={{ color: 'var(--fg-subtle)' }}>{l.prompt}</span>
              <span style={{ color: l.c }}>{l.cmd}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
]

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-32 transition-colors duration-500" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
            style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--fg-subtle)' }}>
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--label-dot)' }} />
            Choose · Deploy · Command · Execute
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-4" style={{ color: 'var(--fg)' }}>
          How it Works
        </h2>
        <p className="text-center text-base max-w-xl mx-auto mb-16" style={{ color: 'var(--fg-muted)' }}>
          Select creators from the marketplace, deploy and let nodes build to run.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group relative p-5 rounded-2xl flex flex-col transition-all duration-300"
              style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; e.currentTarget.style.borderColor = 'var(--border-hover)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-card)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <span className="text-xs font-mono mb-3" style={{ color: 'var(--fg-subtle)' }}>{s.num}</span>
              <h3 className="font-semibold text-sm mb-2" style={{ color: 'var(--fg)' }}>{s.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{s.desc}</p>
              {s.detail}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
