// Runs via `pnpm test:e2e` BEFORE `playwright test` starts.
// Must complete before Playwright launches the webServer, so that:
//  1. .env.development.local exists when Next.js reads environment variables
//  2. e2e.db is freshly migrated and seeded
//  3. Any stale server on port 3001 is gone so Playwright can start a fresh one
import { rmSync, existsSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const E2E_ENV = {
  ...process.env,
  DATABASE_URL: 'file:./e2e.db',
  PAYLOAD_SECRET: 'test-secret-for-integration-tests',
  PAYLOAD_CONFIG_PATH: 'payload.config.ts',
}

// Kill any stale server so Playwright starts a fresh one pointing at e2e.db
try {
  execSync('kill $(lsof -ti:3001)', { stdio: 'ignore', shell: '/bin/sh' })
} catch {
  // No server running — that's fine
}

// Write .env.development.local before Next.js starts — this file has higher
// precedence than .env.local in Next.js's env loading order for `next dev`
// (which forces NODE_ENV=development).
writeFileSync(
  path.join(root, '.env.development.local'),
  'DATABASE_URL=file:./e2e.db\nPAYLOAD_SECRET=test-secret-for-integration-tests\n',
)

// Remove any leftover e2e database
for (const filename of ['e2e.db', 'e2e.db-shm', 'e2e.db-wal']) {
  const fp = path.join(root, filename)
  if (existsSync(fp)) rmSync(fp)
}

// Migrate and seed the fresh database
execSync('pnpm payload migrate', { env: E2E_ENV, cwd: root, stdio: 'inherit' })
execSync('pnpm exec tsx e2e/seed.ts', { env: E2E_ENV, cwd: root, stdio: 'inherit' })
