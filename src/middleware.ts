import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Coming Soon bypass:
 * Visiting any public page with ?testmode=true sets a session cookie that
 * bypasses the Coming Soon holding page. Useful for sharing the live site
 * with stakeholders while the Coming Soon toggle is active in Payload.
 *
 * To enable:  visit any page with ?testmode=true
 * To disable: visit any page with ?testmode=false
 */
export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const response = NextResponse.next()

  if (searchParams.get('testmode') === 'true') {
    response.cookies.set('testmode', '1', { httpOnly: false, sameSite: 'lax', path: '/' })
  } else if (searchParams.get('testmode') === 'false') {
    response.cookies.delete('testmode')
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|admin).*)'],
}
