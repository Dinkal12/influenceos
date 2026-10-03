'use client'
import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeContext'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

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

    const particleColor = theme.vars['--hero-particle'] || '255,255,255'

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number }[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.4 + 0.1,
      })
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${particleColor},${p.alpha})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${particleColor},${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <section
      id="platform"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-500"
      style={{ background: theme.vars['--hero-bg'] }}
    >
      {/* Hero BG image — only on dark theme */}
      {theme.id === 'dark' && (
        <div
          className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'url(/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      )}

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
          style={{ background: 'var(--glow)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
          style={{
            border: '1px solid var(--badge-border)',
            background: 'var(--badge-bg)',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          <span className="text-xs tracking-widest uppercase font-medium" style={{ color: 'var(--fg-muted)' }}>
            Influencer Platform · Now Live
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6" style={{ color: 'var(--fg)' }}>
          Modular Campaigns
          <br />
          <span style={{ color: 'var(--accent)' }}>Powered by Creators.</span>
        </h1>

        {/* Sub */}
        <p className="text-base md:text-lg max-w-xl mb-10 leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
          Creator-driven. Brand-aware. Built to scale. — The all-in-one platform to run influencer campaigns end to end.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href="/register"
            className="group flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[0.98] hover:opacity-90"
            style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}
          >
            Enter the Platform
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm transition-all duration-200 hover:opacity-80"
            style={{
              border: '1px solid var(--cta-secondary-border)',
              color: 'var(--cta-secondary-fg)',
            }}
          >
            See how it works
          </a>
        </div>

        {/* Central icon */}
        <div
          className="mt-20 w-14 h-14 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          style={{
            border: '1px solid var(--border)',
            background: 'var(--icon-bg)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2 12l10 5 10-5" stroke="var(--fg)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-12" style={{ background: `linear-gradient(to bottom, transparent, var(--fg))` }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--fg-subtle)' }}>Scroll</span>
        </div>
      </div>
    </section>
  )
}
