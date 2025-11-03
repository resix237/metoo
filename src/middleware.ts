import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/lib/auth'

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to the login page
    if (request.nextUrl.pathname === '/admin') {
      return NextResponse.next()
    }
    
    // Check authentication for other admin routes
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/articles/:path*'
  ]
}
