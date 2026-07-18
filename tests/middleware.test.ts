import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

function makeRequest(path: string, cookie?: string) {
  const init = cookie ? { headers: { cookie } } : undefined
  return new NextRequest(new URL(path, 'http://localhost'), init)
}

describe('middleware — testmode cookie', () => {
  it('sets testmode=1 cookie when ?testmode=true', () => {
    const req = makeRequest('/?testmode=true')
    const res = middleware(req)
    expect(res.cookies.get('testmode')?.value).toBe('1')
  })

  it('clears testmode cookie when ?testmode=false', () => {
    const req = makeRequest('/?testmode=false')
    const res = middleware(req)
    // delete() sets the cookie to empty string with maxAge=0
    expect(res.cookies.get('testmode')?.value ?? '').toBe('')
  })

  it('does not touch cookies for requests without testmode param', () => {
    const req = makeRequest('/')
    const res = middleware(req)
    expect(res.cookies.get('testmode')).toBeUndefined()
  })

  it('does not touch cookies for unrelated query params', () => {
    const req = makeRequest('/about?foo=bar&baz=1')
    const res = middleware(req)
    expect(res.cookies.get('testmode')).toBeUndefined()
  })

  it('sets testmode cookie on any public path, not just /', () => {
    const req = makeRequest('/join?testmode=true')
    const res = middleware(req)
    expect(res.cookies.get('testmode')?.value).toBe('1')
  })

  it('does not block non-root requests', () => {
    const req = makeRequest('/join')
    const res = middleware(req)
    expect(res).toBeDefined()
    expect(res.status).toBe(200)
  })
})

describe('middleware — temporary root redirect', () => {
  it('redirects the root path to the SETLS catalogue when testmode is not active', () => {
    const req = makeRequest('/')
    const res = middleware(req)
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toBe('https://bwtl.setls.com.au/')
  })

  it('does not redirect the root path when ?testmode=true is set', () => {
    const req = makeRequest('/?testmode=true')
    const res = middleware(req)
    expect(res.status).toBe(200)
  })

  it('does not redirect the root path when the testmode cookie is already set', () => {
    const req = makeRequest('/', 'testmode=1')
    const res = middleware(req)
    expect(res.status).toBe(200)
  })
})
