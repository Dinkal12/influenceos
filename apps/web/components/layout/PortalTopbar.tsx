'use client'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import ThemeSwitcher from '@/components/landing/ThemeSwitcher'

export default function PortalTopbar({ title }: { title?: string }) {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 flex items-center justify-between px-6 h-14 border-b transition-colors duration-500"
      style={{ background: 'var(--bg-2)', borderColor: 'var(--border)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--icon-bg)', border: '1px solid var(--border)' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2 12l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
        {title && <h1 className="text-sm font-semibold" style={{ color: 'var(--fg)' }}>{title}</h1>}
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications bell */}
        <button
          className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--fg-muted)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
        </button>

        {/* Avatar / menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-xl transition-colors"
            style={{ background: menuOpen ? 'var(--accent-2)' : 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
              style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}>
              {session?.user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <span className="hidden md:block text-xs font-medium max-w-[100px] truncate" style={{ color: 'var(--fg)' }}>
              {session?.user?.name ?? 'User'}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-10 w-44 rounded-xl shadow-2xl py-1.5 z-50"
              style={{ background: 'var(--bg-2)', border: '1px solid var(--border)' }}
            >
              <div className="px-3 py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>{session?.user?.name}</div>
                <div className="text-[10px] truncate" style={{ color: 'var(--fg-subtle)' }}>{session?.user?.email}</div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs transition-colors hover:opacity-80"
                style={{ color: 'var(--fg-muted)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
