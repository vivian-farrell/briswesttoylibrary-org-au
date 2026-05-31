import { rmSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default function globalTeardown() {
  for (const filename of ['e2e.db', 'e2e.db-shm', 'e2e.db-wal', '.env.development.local']) {
    const fp = path.join(root, filename)
    if (existsSync(fp)) rmSync(fp)
  }
}
