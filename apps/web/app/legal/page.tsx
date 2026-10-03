import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/landing/ThemeContext'
import SiteHeader from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Legal — InfluenceOS',
  description: 'Privacy, terms, cookies, and security information for InfluenceOS.',
}

const sections = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    paragraphs: [
      'This is placeholder copy for demonstration purposes. Replace it with reviewed legal text before launch.',
      'InfluenceOS collects the information you provide when creating an account — your name, email address, and role — plus the campaign data your team enters into the platform. We use this information to operate the service, not to sell it to third parties.',
      'You can request export or deletion of your account data at any time by contacting the team. Analytics data tied to campaigns is retained for as long as your organisation maintains the corresponding records.',
    ],
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    paragraphs: [
      'This is placeholder copy for demonstration purposes. Replace it with reviewed legal text before launch.',
      'By using InfluenceOS you agree to use the platform only for lawful campaign management and to keep your account credentials confidential. Campaign contracts formed through the platform are agreements between the parties to that contract.',
      'The service is provided as-is with availability targets described in a separate service level agreement once one is published.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookie Policy',
    paragraphs: [
      'This is placeholder copy for demonstration purposes. Replace it with reviewed legal text before launch.',
      'InfluenceOS uses strictly necessary cookies to keep you signed in and to protect form submissions against cross-site request forgery. Theme preferences are stored in your browser locally and are never sent to the server.',
      'We do not use advertising or third-party tracking cookies.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    paragraphs: [
      'This is placeholder copy for demonstration purposes. Replace it with reviewed legal text before launch.',
      'Passwords are hashed with bcrypt before storage and are never readable by platform staff. Sessions are issued as signed tokens, and all traffic is served over HTTPS.',
      'If you believe you have found a security issue, please report it privately before disclosing it publicly, and we will respond as quickly as we can.',
    ],
  },
]

export default function LegalPage() {
  return (
    <ThemeProvider>
      <SiteHeader />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-24">
          <div className="flex justify-center mb-6">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
              style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--fg-muted)' }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
              Legal
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-center mb-14" style={{ color: 'var(--fg)' }}>
            Policies &amp; security
          </h1>

          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--fg)' }}>
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
