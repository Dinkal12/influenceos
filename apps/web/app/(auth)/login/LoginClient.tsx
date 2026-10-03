'use client'
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import AuthPanel from '@/components/auth/AuthPanel'
import { AuthInput } from '@/components/auth/AuthInput'

export default function LoginClient() {
  const router = useRouter()
  const params = useSearchParams()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    if (params.get('registered') === '1') setSuccessMsg('Account created! Sign in to continue.')
    if (params.get('error') === 'unauthorized') setServerError('You are not authorized for that page.')
  }, [params])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({}); setServerError(''); setLoading(true)

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    setLoading(false)
    if (result?.error) {
      setServerError('Invalid email or password')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <AuthPanel
      heading="Welcome back"
      subheading="Sign in to your InfluenceOS account."
      footerText="No account yet?"
      footerLinkText="Sign up free →"
      footerLinkHref="/register"
      badge="SIGN IN"
      rightHeadline={['BACK TO', 'YOUR', 'DASHBOARD.']}
      rightHighlight={2}
      rightSub="Track campaigns, manage creators, approve deliverables — everything you left is still here."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {successMsg && (
          <div
            className="text-sm px-3.5 py-3 rounded-xl flex items-center gap-2"
            style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.25)', color: '#34d399' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            {successMsg}
          </div>
        )}

        <AuthInput
          label="Email"
          type="email"
          id="login-email"
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

        <div>
          <AuthInput
            label="Password"
            type="password"
            id="login-password"
            placeholder="Your password"
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
          <div className="flex justify-end mt-2">
            <a href="#" className="text-xs hover:opacity-80 transition-opacity" style={{ color: 'var(--accent)' }}>
              Forgot password?
            </a>
          </div>
        </div>

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

        {/* CTA button */}
        <button
          type="submit"
          id="login-submit"
          disabled={loading}
          className="mt-1 w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-between px-5 transition-all duration-200 hover:opacity-90 hover:scale-[0.99] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed group"
          style={{ background: 'var(--cta-primary)', color: 'var(--cta-primary-fg)' }}
        >
          <span>{loading ? 'Signing in…' : 'Sign In'}</span>
          {!loading ? (
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

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
          <span className="text-xs" style={{ color: 'var(--fg-subtle)' }}>or</span>
          <div className="flex-1 h-px" style={{ background: 'var(--border)' }} />
        </div>

        {/* Google OAuth */}
        <button
          type="button"
          id="login-google"
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2.5 transition-all duration-200 hover:opacity-80 hover:scale-[0.99]"
          style={{ background: 'var(--input-bg)', border: '1px solid var(--border)', color: 'var(--fg)' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
      </form>
    </AuthPanel>
  )
}
