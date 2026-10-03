import Navbar from '@/components/landing/Navbar'
import HeroSection from '@/components/landing/HeroSection'
import PartnersSection from '@/components/landing/PartnersSection'
import WhatIsSection from '@/components/landing/WhatIsSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import WhatWeProvideSection from '@/components/landing/WhatWeProvideSection'
import Footer from '@/components/landing/Footer'
import ThemeSwitcher from '@/components/landing/ThemeSwitcher'
import { ThemeProvider } from '@/components/landing/ThemeContext'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <ThemeProvider>
      <main style={{ background: 'var(--bg)', minHeight: '100vh', transition: 'background 0.5s' }}>
        <Navbar />
        <HeroSection />
        <PartnersSection />
        <WhatIsSection />
        <HowItWorksSection />
        <WhatWeProvideSection />
        <Footer />
        <ThemeSwitcher />
      </main>
    </ThemeProvider>
  )
}
