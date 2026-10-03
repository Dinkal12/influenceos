'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              background: 'var(--nav-scroll)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid var(--border)',
            }
          : { background: 'transparent' }
      }
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
            style={{
              background: 'var(--icon-bg)',
              border: '1px solid var(--border-hover)',
            }}
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

        {/* Center Nav */}
        <div
          className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5"
          style={{ background: 'var(--badge-bg)', border: '1px solid var(--border)' }}
        >
          {['Platform', 'Features', 'How it Works', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, '-')}`}
              className="px-4 py-1.5 text-sm rounded-full transition-all duration-200"
              style={{ color: 'var(--fg-muted)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--fg)'
                e.currentTarget.style.background = 'var(--accent-2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--fg-muted)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden md:block text-sm transition-colors"
            style={{ color: 'var(--fg-muted)' }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="text-sm px-4 py-2 rounded-full font-medium transition-all duration-200 hover:opacity-90 hover:scale-[0.98]"
            style={{
              background: 'var(--cta-primary)',
              color: 'var(--cta-primary-fg)',
            }}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}
