'use client'
import { useState } from 'react'
import { useTheme, THEMES, ThemeId } from './ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      {/* Panel */}
      <div
        className={`flex flex-col gap-2 p-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
        style={{
          background: 'var(--bg-2)',
          borderColor: 'var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
        }}
      >
        <p
          className="text-[10px] uppercase tracking-widest font-semibold px-1 pb-1 border-b"
          style={{ color: 'var(--fg-subtle)', borderColor: 'var(--border)' }}
        >
          Choose Theme
        </p>
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTheme(t.id as ThemeId); setOpen(false) }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group"
            style={{
              background: theme.id === t.id ? 'var(--accent-2)' : 'transparent',
              border: `1px solid ${theme.id === t.id ? 'var(--border-hover)' : 'transparent'}`,
            }}
          >
            {/* Swatch */}
            <div
              className="w-7 h-7 rounded-lg flex-shrink-0 ring-2 transition-all"
              style={{
                background: t.preview,
                boxShadow: theme.id === t.id ? `0 0 0 2px var(--accent)` : 'none',
              }}
            />
            <div>
              <div
                className="text-xs font-semibold leading-none"
                style={{ color: 'var(--fg)' }}
              >
                {t.name}
              </div>
              <div
                className="text-[10px] mt-0.5"
                style={{ color: 'var(--fg-muted)' }}
              >
                {t.label}
              </div>
            </div>
            {theme.id === t.id && (
              <svg
                className="ml-auto w-3.5 h-3.5 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'var(--accent)',
          color: 'var(--accent-fg)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        title="Switch Theme"
        aria-label="Switch Theme"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </button>
    </div>
  )
}
