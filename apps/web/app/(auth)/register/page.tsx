'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthPanel from '@/components/auth/AuthPanel'
import { AuthInput } from '@/components/auth/AuthInput'

type Role = 'creator' | 'coordinator'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>('creator')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.password.length < 6) e.password = 'At least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setServerError(''); setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role }),
      })
      const data = await res.json()
      if (!res.ok) { setServerError(data.error || 'Registration failed'); return }
      setSuccess(true)
      setTimeout(() => router.push('/login?registered=1'), 1600)
    } catch {
      setServerError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthPanel
      heading="Create your space"
      subheading="A home for your campaigns, creators, and contracts."
      footerText="Already wired up?"
      footerLinkText="Sign in →"
      footerLinkHref="/login"
      badge="NEW ACCOUNT"
      rightHeadline={['BUILD YOUR', 'CONTROL', 'SPACE.']}
      rightHighlight={2}
      rightSub="Pair campaigns with creators, manage contracts, approve deliverables, and track payouts — all from one console built for speed."
    >
      {/* Role Selector */}
      <div
        className="flex rounded-xl p-1 mb-5"
        style={{ background: 'var(--input-bg)', border: '1px solid var(--border)' }}
      >
        {(['creator', 'coordinator'] as Role[]).map((r) => (
          <button
            key={r}
            type="button"
            id={`role-${r}`}
            onClick={() => setRole(r)}
            className="flex-1 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5"
            style={{
              background: role === r ? 'var(--cta-primary)' : 'transparent',
              color: role === r ? 'var(--cta-primary-fg)' : 'var(--fg-muted)',
              boxShadow: role === r ? '0 4px 16px var(--accent-glow)' : 'none',
            }}
          >
            <span>{r === 'creator' ? '🎬' : '📋'}</span>
            <span className="capitalize">{r}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        <AuthInput
          label="Full Name"
          type="text"
          id="register-name"
          placeholder="Alex Johnson"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />

        <AuthInput
          label="Email"
          type="email"
          id="register-email"
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          }
        />

        <AuthInput
          label="Password"
          type="password"
          id="register-password"
          placeholder="Min. 6 characters"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0110 0v4" />
            </svg>
          }
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          id="register-confirm"
          placeholder="Repeat password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          error={errors.confirm}
          icon={
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          }
        />

        {serverError && (
          <div
            className="text-sm px-3.5 py-3 rounded-xl flex items-center gap-2"
            style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 8v4M12 16h.01" />
            </svg>
            {serverError}
          </div>
        )}

        {success && (
          <div
            className="text-sm px-3.5 py-3 rounded-xl flex items-center gap-2"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Account created! Redirecting to login…
          </div>
        )}

        {/* CTA button */}
        <button
          type="submit"
          id="register-submit"
          disabled={loading || success}
          className="mt-1 w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-between px-5 transition-all duration-200 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed group"
          style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}
        >
          <span>{loading ? 'Creating account…' : 'Create account'}</span>
          {!loading && !success ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              className="transition-transform duration-200 group-hover:translate-x-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          ) : (
            <svg className="animate-spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          )}
        </button>

        <p className="text-center text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
          By signing up you agree to our{' '}
          <a href="#" className="underline hover:opacity-80" style={{ color: 'var(--fg-muted)' }}>Terms</a>{' '}
          and{' '}
          <a href="#" className="underline hover:opacity-80" style={{ color: 'var(--fg-muted)' }}>Privacy Policy</a>.
        </p>
      </form>
    </AuthPanel>
  )
}
