import { rmSync, existsSync } from 'fs'
import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export function setup() {
  // Remove any leftover test database from a previous run
  for (const filename of ['test.db', 'test.db-shm', 'test.db-wal']) {
    const fp = path.join(root, filename)
    if (existsSync(fp)) rmSync(fp)
  }

  // Apply migrations to create the test database schema.
  // Uses the same migration files as production so the schema is identical.
  execSync('pnpm payload migrate', {
    env: {
      ...process.env,
      DATABASE_URL: 'file:./test.db',
      PAYLOAD_CONFIG_PATH: 'payload.config.ts',
      PAYLOAD_SECRET: 'test-secret-for-integration-tests',
    },
    cwd: root,
    stdio: 'inherit',
  })
}

export function teardown() {
  for (const filename of ['test.db', 'test.db-shm', 'test.db-wal']) {
    const fp = path.join(root, filename)
    if (existsSync(fp)) rmSync(fp)
  }
}
