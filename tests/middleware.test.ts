import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { middleware } from '@/middleware'

function makeRequest(path: string) {
  return new NextRequest(new URL(path, 'http://localhost'))
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

  it('always returns a response (does not block requests)', () => {
    const req = makeRequest('/')
    const res = middleware(req)
    expect(res).toBeDefined()
    expect(res.status).toBe(200)
  })
})
