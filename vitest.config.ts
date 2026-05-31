import { defineConfig } from 'vitest/config'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  test: {
    globalSetup: './tests/global-setup.ts',
    exclude: ['**/node_modules/**', '**/e2e/**'],
    environment: 'node',
    testTimeout: 60_000,
    hookTimeout: 60_000,
    // Run all test files in one forked process so the Payload singleton is shared
    // and there is only ever one SQLite connection.
    pool: 'forks',
    singleFork: true,
    fileParallelism: false,
    // Inject test-specific env vars into worker processes
    env: {
      DATABASE_URL: 'file:./test.db',
      PAYLOAD_SECRET: 'test-secret-for-integration-tests',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@payload-config': path.resolve(__dirname, 'payload.config.ts'),
    },
  },
})
