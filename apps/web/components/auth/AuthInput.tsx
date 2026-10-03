'use client'
import { InputHTMLAttributes, forwardRef, useState } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, error, icon, type, ...props }, ref) => {
    const [showPw, setShowPw] = useState(false)
    const [focused, setFocused] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword ? (showPw ? 'text' : 'password') : type

    return (
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ color: 'var(--fg-muted)' }}
        >
          {label}
        </label>
        <div className="relative">
          {icon && (
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors duration-200"
              style={{ color: focused ? 'var(--accent)' : 'var(--fg-subtle)' }}
            >
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={inputType}
            className="w-full rounded-lg px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-sm"
            style={{
              background: 'var(--input-bg)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.6)' : focused ? 'var(--accent)' : 'var(--border)'}`,
              color: 'var(--fg)',
              paddingLeft: icon ? '2.75rem' : '1rem',
              paddingRight: isPassword ? '3rem' : '1rem',
              boxShadow: focused && !error
                ? '0 0 0 3px var(--accent-glow)'
                : error
                  ? '0 0 0 3px rgba(239,68,68,0.1)'
                  : 'none',
              caretColor: 'var(--accent)',
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPw((p) => !p)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
              style={{ color: 'var(--fg-subtle)' }}
            >
              {showPw ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && <p className="text-[11px] text-red-400 mt-0.5">{error}</p>}
      </div>
    )
  }
)
AuthInput.displayName = 'AuthInput'
