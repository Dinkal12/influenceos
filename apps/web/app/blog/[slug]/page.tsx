import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/landing/ThemeContext'
import SiteHeader from '@/components/layout/SiteHeader'
import { posts, getPost, formatDate } from '@/lib/content/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPost(params.slug)
  if (!post) return { title: 'Post not found — InfluenceOS' }
  return { title: `${post.title} — InfluenceOS`, description: post.excerpt }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <ThemeProvider>
      <SiteHeader />
      <main className="min-h-screen" style={{ background: 'var(--bg)' }}>
        <article className="max-w-3xl mx-auto px-6 pt-28 pb-24">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-opacity hover:opacity-70"
            style={{ color: 'var(--fg-muted)' }}
          >
            <span aria-hidden>←</span> All posts
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5 text-xs" style={{ color: 'var(--fg-subtle)' }}>
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

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: 'var(--fg)' }}>
            {post.title}
          </h1>
          <p className="text-base md:text-lg leading-relaxed mb-10 pb-10" style={{ color: 'var(--fg-muted)', borderBottom: '1px solid var(--section-divider)' }}>
            {post.excerpt}
          </p>

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: 'var(--fg)' }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8" style={{ borderTop: '1px solid var(--section-divider)' }}>
            <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--fg-subtle)' }}>
              Keep reading
            </p>
            <div className="grid gap-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all"
                >
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--fg)' }}>{p.title}</p>
                  <p className="text-xs" style={{ color: 'var(--fg-subtle)' }}>{p.category} · {p.readTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>
    </ThemeProvider>
  )
}
