import { ThemeProvider } from '@/components/landing/ThemeContext'
import ThemeSwitcher from '@/components/landing/ThemeSwitcher'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex transition-colors duration-500"
        style={{ background: 'var(--bg)' }}
      >
        {children}
        <ThemeSwitcher />
      </div>
    </ThemeProvider>
  )
}
