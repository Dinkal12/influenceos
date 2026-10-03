import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Role-based route protection
    if (path.startsWith('/coordinator-portal') && token?.role !== 'coordinator' && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
    }
    if (path.startsWith('/creator-portal') && token?.role !== 'creator' && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/coordinator-portal/:path*',
    '/creator-portal/:path*',
  ],
}
