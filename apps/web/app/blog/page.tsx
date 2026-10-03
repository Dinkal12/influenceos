import Link from 'next/link'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/landing/ThemeContext'
import SiteHeader from '@/components/layout/SiteHeader'
import { posts, formatDate } from '@/lib/content/blog'

export const metadata: Metadata = {
  title: 'Blog — InfluenceOS',
  description: 'Notes on campaign analytics, creator operations, and the InfluenceOS platform.',
}

export default function BlogIndexPage() {
  return (
    <ThemeProvider>
      <SiteHeader />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
          <div className="flex justify-center mb-6">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs uppercase tracking-widest"
              style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--fg-muted)' }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: 'var(--accent)' }} />
              Blog
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-4" style={{ color: 'var(--fg)' }}>
            Notes from the platform
          </h1>
          <p
            className="text-center text-base max-w-2xl mx-auto mb-16 leading-relaxed"
            style={{ color: 'var(--fg-muted)' }}
          >
            Writing on campaign analytics, creator operations, and how InfluenceOS is built.
          </p>

          <div className="grid gap-4">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block p-6 rounded-2xl transition-all duration-300 border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)]"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3 text-xs" style={{ color: 'var(--fg-subtle)' }}>
                  <span
                    className="px-2.5 py-0.5 rounded-full uppercase tracking-widest"
                    style={{ border: '1px solid var(--border)', background: 'var(--badge-bg)', color: 'var(--accent)' }}
                  >
                    {post.category}
                  </span>
                  <span>{formatDate(post.date)}</span>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2
                  className="text-lg md:text-xl font-semibold mb-2 transition-colors group-hover:opacity-80"
                  style={{ color: 'var(--fg)' }}
                >
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--fg-muted)' }}>
                  {post.excerpt}
                </p>

                <span className="text-sm font-medium inline-flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                  Read article
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
