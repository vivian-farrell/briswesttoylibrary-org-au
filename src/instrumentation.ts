export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Payload's db-sqlite adapter only calls pushDevSchema (which creates tables)
    // when NODE_ENV !== 'production'. On Vercel the DB starts empty, so we
    // briefly override NODE_ENV to trigger the schema push, then restore it.
    const savedEnv = process.env.NODE_ENV
    ;(process.env as Record<string, string>).NODE_ENV = 'development'
    try {
      const { getPayload } = await import('payload')
      const { default: config } = await import('../payload.config')
      await getPayload({ config })
    } finally {
      ;(process.env as Record<string, string>).NODE_ENV = savedEnv ?? 'production'
    }
  }
}
