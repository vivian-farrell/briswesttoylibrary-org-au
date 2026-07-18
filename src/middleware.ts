import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporary: the home page isn't ready yet, so send public visitors to the
// SETLS catalogue instead. Same bypass as Coming Soon mode (?testmode=true)
// lets us keep previewing the real home page while this is active.
// Remove this block to restore the built home page.
const ROOT_REDIRECT_URL = 'https://bwtl.setls.com.au/'

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
  const { pathname, searchParams } = request.nextUrl
  const response = NextResponse.next()

  if (searchParams.get('testmode') === 'true') {
    response.cookies.set('testmode', '1', { httpOnly: false, sameSite: 'lax', path: '/' })
  } else if (searchParams.get('testmode') === 'false') {
    response.cookies.delete('testmode')
  }

  const testmodeActive =
    searchParams.get('testmode') === 'true' || request.cookies.get('testmode')?.value === '1'

  if (pathname === '/' && !testmodeActive) {
    return NextResponse.redirect(ROOT_REDIRECT_URL, 307)
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|admin).*)'],
}
