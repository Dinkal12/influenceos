import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/landing/ThemeContext'
import SiteHeader from '@/components/layout/SiteHeader'
import { roles } from '@/lib/content/careers'

export const metadata: Metadata = {
  title: 'Careers — InfluenceOS',
  description: 'Open roles on the InfluenceOS team. Remote-first, building campaign tooling for brands and creators.',
}

export default function CareersPage() {
  return (
    <ThemeProvider>
      <SiteHeader />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
          <div className="flex justify-center mb-6">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
              style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--fg-muted)' }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
              Careers
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-4" style={{ color: 'var(--fg)' }}>
            Build the campaign layer
          </h1>
          <p
            className="text-center text-base max-w-2xl mx-auto mb-6 leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            We are a small, remote-first team building the operating system for influencer campaigns. Open roles below.
          </p>
          <p
            className="text-center text-xs max-w-2xl mx-auto mb-16"
            style={{ color: 'var(--fg-subtle)' }}
          >
            Sample listings — replace with live openings in lib/content/careers.ts.
          </p>

          <div className="grid gap-4">
            {roles.map((role) => (
              <details
                key={role.slug}
                className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] open:border-[var(--border-hover)] transition-all"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold mb-1.5" style={{ color: 'var(--fg)' }}>
                        {role.title}
                      </h2>
                      <div
                        className="flex flex-wrap items-center gap-2.5 text-xs"
                        style={{ color: 'var(--fg-subtle)' }}
                      >
                        <span>{role.team}</span>
                        <span aria-hidden>·</span>
                        <span>{role.location}</span>
                        <span aria-hidden>·</span>
                        <span>{role.type}</span>
                      </div>
                    </div>
                    <span
                      className="text-sm font-medium flex items-center gap-1.5 shrink-0"
                      style={{ color: 'var(--accent)' }}
                    >
                      View role
                      <span className="transition-transform group-open:rotate-90" aria-hidden>›</span>
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--fg-muted)' }}>
                    {role.summary}
                  </p>
                </summary>

                <div className="mt-5 pt-5 grid gap-6 md:grid-cols-2" style={{ borderTop: '1px solid var(--section-divider)' }}>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>
                      What you&apos;ll do
                    </h3>
                    <ul className="space-y-2">
                      {role.responsibilities.map((item) => (
                        <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--fg-muted)' }}>
                          <span style={{ color: 'var(--accent)' }} aria-hidden>—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs uppercase tracking-widest mb-3" style={{ color: 'var(--fg-subtle)' }}>
                      What we look for
                    </h3>
                    <ul className="space-y-2">
                      {role.requirements.map((item) => (
                        <li key={item} className="text-sm leading-relaxed flex gap-2" style={{ color: 'var(--fg-muted)' }}>
                          <span style={{ color: 'var(--accent)' }} aria-hidden>—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <a
                  href={`mailto:careers@influenceos.com?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90 hover:scale-[0.98]"
                  style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}
                >
                  Apply for this role
                  <span aria-hidden>→</span>
                </a>
              </details>
            ))}
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
