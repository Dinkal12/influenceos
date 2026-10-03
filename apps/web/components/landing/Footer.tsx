'use client'

import Link from 'next/link'

const columns = [
  {
    title: 'Platform',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Marketplace', href: '/#features' },
      { label: 'Analytics', href: '/#features' },
      { label: 'Contracts', href: '/#features' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#platform' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/legal#privacy' },
      { label: 'Terms', href: '/legal#terms' },
      { label: 'Cookies', href: '/legal#cookies' },
      { label: 'Security', href: '/legal#security' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="py-16 transition-colors duration-500" style={{ borderTop: '1px solid var(--section-divider)', background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-hover)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-semibold text-sm" style={{ color: 'var(--fg)' }}>InfluenceOS</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--fg-muted)' }}>
              The modular influencer campaign platform for modern brands and creators.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--fg-subtle)' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:opacity-80"
                      style={{ color: 'var(--fg-subtle)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-subtle)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4" style={{ borderTop: '1px solid var(--section-divider)' }}>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>© {new Date().getFullYear()} InfluenceOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[
              { label: 'Twitter', href: '#' },
              { label: 'GitHub', href: 'https://github.com/Dinkal12/influenceos' },
              { label: 'Discord', href: '#' },
            ].map((s) => (
              <a key={s.label} href={s.href} className="text-xs transition-colors" style={{ color: 'var(--fg-subtle)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-subtle)')}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
