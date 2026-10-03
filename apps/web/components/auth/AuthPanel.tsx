'use client'
import { useEffect, useRef } from 'react'
import { useTheme, THEMES } from '@/components/landing/ThemeContext'
import Link from 'next/link'

interface AuthPanelProps {
  children: React.ReactNode
  heading: string
  subheading: string
  footerText: string
  footerLinkText: string
  footerLinkHref: string
  badge?: string
  rightHeadline?: string[]   // lines of the big hero headline
  rightHighlight?: number    // which line index gets accent colour
  rightSub?: string
  stats?: { val: string; label: string }[]
}

// Inline theme switcher for auth pages
function AuthThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const themes = [
    { id: 'dark', label: 'Dark', bg: '#111', accent: '#ff6b00' },
    { id: 'minimal', label: 'Light', bg: '#f4f4f5', accent: '#e85d00' },
    { id: 'moody', label: 'Amber', bg: '#13110d', accent: '#f59e0b' },
    { id: 'emerald', label: 'Emerald', bg: '#0a1f14', accent: '#34d399' },
  ] as const

  return (
    <div className="absolute top-5 right-5 z-50 flex items-center gap-1.5 p-1.5 rounded-xl backdrop-blur-sm"
      style={{ background: 'var(--form-card-bg)', border: '1px solid var(--form-card-border)' }}>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          title={t.label}
          className="w-6 h-6 rounded-lg transition-all duration-200 hover:scale-110"
          style={{
            background: t.bg,
            border: theme.id === t.id ? `2px solid ${t.accent}` : '1px solid rgba(128,128,128,0.2)',
            boxShadow: theme.id === t.id ? `0 0 8px ${t.accent}60` : 'none',
          }}
        />
      ))}
    </div>
  )
}

export default function AuthPanel({
  children,
  heading,
  subheading,
  footerText,
  footerLinkText,
  footerLinkHref,
  badge = '● LIVE',
  rightHeadline = ['GROW YOUR', 'INFLUENCE', 'BRAND.'],
  rightHighlight = 2,
  rightSub = 'Run end-to-end influencer campaigns — contracts, deliverables, analytics, and payouts — all in one platform built for creators and coordinators.',
  stats = [
    { val: '12K+', label: 'Creators' },
    { val: '3.4K', label: 'Campaigns' },
    { val: '$8M+', label: 'Paid Out' },
  ],
}: AuthPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  // Animated dot-grid on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let frame: number
    let t = 0

    const draw = () => {
      t += 0.003
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Grid lines
      const gridSize = 48
      ctx.strokeStyle = `rgba(${theme.vars['--hero-particle'] || '255,255,255'},0.04)`
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }

      // Floating particles
      const pc = theme.vars['--hero-particle'] || '255,255,255'
      for (let i = 0; i < 30; i++) {
        const x = (Math.sin(t * 0.7 + i * 1.3) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(t * 0.5 + i * 1.7) * 0.5 + 0.5) * canvas.height
        const r = Math.sin(t + i) * 0.5 + 1
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${pc},0.2)`
        ctx.fill()
      }

      frame = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize) }
  }, [theme])

  return (
    <div className="flex w-full min-h-screen relative">
      <AuthThemeSwitcher />

      {/* ── LEFT — Form Card ── */}
      <div
        className="w-full lg:w-[44%] flex flex-col justify-center items-center relative z-10 px-6 py-16"
        style={{ background: 'var(--bg)' }}
      >
        {/* subtle bg grid on form side */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={`col-${i}`} className="absolute top-0 bottom-0 w-px"
              style={{ left: `${i * 10 + 5}%`, background: 'var(--grid-color)' }} />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={`row-${i}`} className="absolute left-0 right-0 h-px"
              style={{ top: `${i * 7 + 3}%`, background: 'var(--grid-color)' }} />
          ))}
        </div>

        <div className="w-full max-w-[400px] relative">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 mb-8 group w-fit">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background: 'var(--accent)', color: 'var(--accent-fg)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-black text-sm tracking-wider uppercase" style={{ color: 'var(--fg)' }}>
              Influence<span style={{ color: 'var(--accent)' }}>OS</span>
            </span>
          </Link>

          {/* Status badge */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-md"
              style={{
                background: 'var(--badge-bg)',
                border: '1px solid var(--badge-border)',
                color: 'var(--accent)',
              }}
            >
              <span className="animate-pulse">●</span> {badge}
            </span>
          </div>

          {/* Card */}
          <div
            className="rounded-2xl p-7 relative"
            style={{
              background: 'var(--form-card-bg)',
              border: '1px solid var(--form-card-border)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
            }}
          >
            {/* Accent line top */}
            <div className="absolute top-0 left-8 right-8 h-[1px]"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />

            <h1 className="text-2xl font-black mb-1 tracking-tight" style={{ color: 'var(--fg)' }}>
              {heading}
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--fg-muted)' }}>
              {subheading}
            </p>

            {children}
          </div>

          {/* Footer link */}
          <p className="text-center text-sm mt-6" style={{ color: 'var(--fg-muted)' }}>
            {footerText}{' '}
            <Link
              href={footerLinkHref}
              className="font-bold transition-all duration-200 hover:underline"
              style={{ color: 'var(--accent)' }}
            >
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT — Hero panel (hidden mobile) ── */}
      <div
        className="hidden lg:flex lg:flex-1 relative flex-col justify-between p-14 overflow-hidden"
        style={{ background: 'var(--bg-2)' }}
      >
        {/* Animated canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, var(--accent-glow, rgba(255,107,0,0.12)) 0%, transparent 70%)` }} />

        {/* Top-right status pill */}
        <div className="relative z-10 self-end flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full"
            style={{ background: 'var(--badge-bg)', border: '1px solid var(--badge-border)', color: 'var(--accent)' }}>
            ● PROVISIONING
          </span>
        </div>

        {/* Hero headline */}
        <div className="relative z-10 flex flex-col justify-center flex-1 mt-8">
          <div className="mb-6">
            {rightHeadline.map((line, i) => (
              <div
                key={i}
                className="text-[3.5rem] xl:text-[4.5rem] font-black leading-none tracking-tight"
                style={{
                  color: i === rightHighlight ? 'var(--accent)' : 'var(--hero-headline, var(--fg))',
                  opacity: i === 1 ? 0.25 : 1,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          <div
            className="w-16 h-px mb-6"
            style={{ background: 'var(--accent)' }}
          />

          <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--fg-muted)' }}>
            {rightSub}
          </p>

          {/* Dashboard widget */}
          <div
            className="mt-10 p-4 rounded-xl w-fit"
            style={{ background: 'var(--form-card-bg)', border: '1px solid var(--form-card-border)' }}
          >
            <div className="text-[10px] font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--fg-subtle)' }}>
              CONTROLLER
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-sm font-bold" style={{ color: 'var(--fg)' }}>CAMPAIGN MGR</div>
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-widest" style={{ color: 'var(--fg-subtle)' }}>FIRMWARE</span>
              <span className="text-[10px] font-mono font-bold" style={{ color: 'var(--fg-muted)' }}>v3.0.1</span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 flex gap-10 border-t pt-8" style={{ borderColor: 'var(--border)' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black" style={{ color: 'var(--accent)' }}>{s.val}</div>
              <div className="text-xs mt-0.5 font-medium" style={{ color: 'var(--fg-subtle)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
