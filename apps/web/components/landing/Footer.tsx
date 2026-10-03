'use client'

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
          {[
            { title: 'Platform', links: ['Features', 'Marketplace', 'Analytics', 'Contracts'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
            { title: 'Legal', links: ['Privacy', 'Terms', 'Cookies', 'Security'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--fg-subtle)' }}>{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors"
                      style={{ color: 'var(--fg-subtle)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-subtle)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4" style={{ borderTop: '1px solid var(--section-divider)' }}>
          <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>© 2024 InfluenceOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {['Twitter', 'GitHub', 'Discord'].map((s) => (
              <a key={s} href="#" className="text-xs transition-colors" style={{ color: 'var(--fg-subtle)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--fg-subtle)')}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
