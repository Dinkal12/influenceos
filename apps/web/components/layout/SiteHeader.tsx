import Link from 'next/link'

/** Minimal sticky header used by the content pages (/blog, /careers, /legal). */
export default function SiteHeader() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: 'var(--nav-scroll)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--icon-bg)', border: '1px solid var(--border-hover)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 17l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ color: 'var(--fg)' }}>
            InfluenceOS
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-sm">
          <Link href="/blog" className="transition-colors hover:opacity-80" style={{ color: 'var(--fg-muted)' }}>
            Blog
          </Link>
          <Link href="/careers" className="transition-colors hover:opacity-80" style={{ color: 'var(--fg-muted)' }}>
            Careers
          </Link>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full font-medium transition-all hover:opacity-90"
            style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  )
}
