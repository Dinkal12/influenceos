'use client'

const features = [
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'Decentralized Campaign Marketplace',
    desc: 'Browse and deploy creator campaigns across a distributed network of verified influencers.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82V15.18a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>,
    title: 'Real-Time, Data-Driven Execution',
    desc: 'Live analytics and performance dashboards update in real time across all active campaigns.',
  },
  {
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    title: 'Protocol Layer for Brand & Creator Interoperability',
    desc: 'Contracts, deliverables, and payouts handled seamlessly across any platform or brand.',
  },
]

export default function WhatIsSection() {
  return (
    <section
      id="features"
      className="py-32 transition-colors duration-500"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-center mb-6">
          <span
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
            style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--fg-subtle)' }}
          >
            <span className="w-1 h-1 rounded-full" style={{ background: 'var(--label-dot)' }} />
            Introduction
          </span>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--fg)' }}>
            What is InfluenceOS?
          </h2>
        </div>
        <p className="text-center text-base max-w-2xl mx-auto mb-16 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          A creator-native modular platform built on real integrations — bringing real-world brands and creators together with chain-of-trust logic and smart contracts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative p-6 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-card-hover)'
                e.currentTarget.style.borderColor = 'var(--border-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-200"
                style={{ background: 'var(--icon-bg)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
              >
                {f.icon}
              </div>
              <h3 className="text-sm font-semibold mb-2 leading-snug" style={{ color: 'var(--fg)' }}>{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--fg-muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
