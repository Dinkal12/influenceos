import { ThemeProvider } from '@/components/landing/ThemeContext'
import ThemeSwitcher from '@/components/landing/ThemeSwitcher'
import PortalSidebar from '@/components/layout/PortalSidebar'

export default function CreatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
        <div className="flex min-h-screen" style={{ background: 'var(--bg)' }}>
          <PortalSidebar role="creator" />
          <div className="flex-1 flex flex-col min-w-0">
            {children}
          </div>
        </div>
        <ThemeSwitcher />
      </ThemeProvider>
  )
}
