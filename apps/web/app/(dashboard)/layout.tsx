import { ThemeProvider } from '@/components/landing/ThemeContext'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
