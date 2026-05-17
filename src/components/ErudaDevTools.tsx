'use client'

import { useEffect } from 'react'

export function ErudaDevTools() {
  useEffect(() => {
    import('eruda').then(({ default: eruda }) => eruda.init())
  }, [])
  return null
}
