'use client'
import { ThemeProvider } from '@/components/landing/ThemeContext'
import ThemeSwitcher from '@/components/landing/ThemeSwitcher'
import PortalSidebar from '@/components/layout/PortalSidebar'
import { SessionProvider } from 'next-auth/react'

export default function CoordinatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
          <PortalSidebar role="coordinator" />
          <div className="flex-1 flex flex-col min-w-0">
            {children}
          </div>
        </div>
        <ThemeSwitcher />
      </ThemeProvider>
    </SessionProvider>
  )
}
