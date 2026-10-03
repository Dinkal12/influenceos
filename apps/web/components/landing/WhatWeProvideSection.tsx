'use client'

const offerings = [
  {
    tag: 'Core Engine',
    title: 'Campaign Kernel',
    desc: 'Agent-native functions for persistent memory, smart coordination, and real-time campaign logic.',
    visual: (
      <div className="mt-6 relative h-32 flex items-center justify-center">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20" />
          <div className="absolute inset-2 rounded-full border border-white/20" />
          <div className="w-full h-full rounded-full bg-white/[0.06] flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
            </svg>
          </div>
        </div>
        {/* Orbiting dots */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-white/30"
            style={{
              top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 36}px - 4px)`,
              left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 36}px - 4px)`,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    tag: 'Sync Layer',
    title: 'Edge-Synced Execution',
    desc: 'State that synchronizes across chains, apps, and user devices in seamless real-time sync.',
    visual: (
      <div className="mt-6 rounded-xl overflow-hidden border border-white/[0.08] bg-black/60">
        <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/30">Live Sync</span>
        </div>
        <div className="p-3 space-y-2">
          {['InfluenceOS Campaign Server', 'Base', 'GitHub Webhook', 'Redis Cache'].map((item, i) => (
            <div key={item} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer">
              <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-emerald-400' : 'bg-white/20'}`} />
              <span className="text-[11px] text-white/40">{item}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    tag: 'Dev Tools',
    title: 'PlugStack Dev Tools',
    desc: 'CLI tools, schema engines, and templates for fast, scalable MCP campaign deployments.',
    visual: (
      <div className="mt-6 flex gap-3 flex-wrap">
        {['CLI', 'Schema', 'Templates', 'SDK', 'API'].map((t) => (
          <span
            key={t}
            className="px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[11px] text-white/40 font-mono hover:text-white/70 hover:border-white/20 transition-colors cursor-pointer"
          >
            {t}
          </span>
        ))}
        <div className="w-full mt-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="w-full font-mono text-[10px] text-emerald-400/60 space-y-1">
          <div>{'> influenceos init --template=campaign'}</div>
          <div className="text-white/20">{'  ✓ Schema generated'}</div>
          <div className="text-white/20">{'  ✓ Endpoints scaffolded'}</div>
        </div>
      </div>
    ),
  },
]

export default function WhatWeProvideSection() {
  return (
    <section id="pricing" className="py-32 bg-black border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/[0.1] bg-white/[0.03] text-xs text-white/40 uppercase tracking-widest">
            <span className="w-1 h-1 rounded-full bg-white/40" />
            Your Influence Runs on InfluenceOS
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white text-center tracking-tight mb-4">
          What we provide?
        </h2>
        <p className="text-center text-white/40 max-w-2xl mx-auto mb-16 text-base leading-relaxed">
          InfluenceOS brings together decentralized execution, modular design, and real-time voice compute through the Campaign Runtime.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {offerings.map((o) => (
            <div
              key={o.title}
              className="group relative p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
              />
              <div className="relative z-10">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-medium">{o.tag}</span>
                <h3 className="text-white font-semibold text-base mt-1 mb-2">{o.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{o.desc}</p>
                {o.visual}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom code block */}
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
          <div className="px-6 py-3 border-b border-white/[0.06] flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
            <span className="text-xs text-white/30 font-mono">influenceos-runtime.ts</span>
          </div>
          <div className="p-6 font-mono text-[12px] space-y-1 overflow-x-auto">
            <div><span className="text-white/20">{'// Make a POST Request to the GET API'}</span></div>
            <div>
              <span className="text-blue-400/70">const</span>
              <span className="text-white/60"> response = </span>
              <span className="text-emerald-400/70">await</span>
              <span className="text-white/60"> fetch(</span>
            </div>
            <div className="pl-4">
              <span className="text-orange-300/70">{'"https://api.influenceos.com/v1/campaigns"'}</span>
              <span className="text-white/60">,</span>
            </div>
            <div className="pl-4 space-y-1">
              <div><span className="text-white/40">{'{'}</span></div>
              <div className="pl-4"><span className="text-white/50">method: </span><span className="text-orange-300/70">{'"POST"'}</span><span className="text-white/40">,</span></div>
              <div className="pl-4"><span className="text-white/50">headers: </span><span className="text-white/40">{'{'} Authorization: </span><span className="text-orange-300/70">{"`Bearer ${TOKEN}`"}</span><span className="text-white/40"> {'}'}</span></div>
              <div><span className="text-white/40">{'}'}</span></div>
            </div>
            <div><span className="text-white/60">)</span></div>
            <div className="mt-2">
              <span className="text-blue-400/70">const</span>
              <span className="text-white/60"> data = </span>
              <span className="text-emerald-400/70">await</span>
              <span className="text-white/60"> response.</span>
              <span className="text-yellow-300/60">json</span>
              <span className="text-white/60">()</span>
            </div>
            <div className="mt-1"><span className="text-white/20">{'// On Setup: influenceos.run({ agents: true })'}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
