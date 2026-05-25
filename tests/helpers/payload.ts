import { getPayload } from 'payload'
import config from '../../payload.config.ts'

let _payload: Awaited<ReturnType<typeof getPayload>> | null = null

/**
 * Returns a singleton Payload instance connected to the test database.
 * DATABASE_URL is injected via vitest.config.ts env, pointing at test.db.
 */
export async function getTestPayload() {
  if (!_payload) {
    _payload = await getPayload({ config })
  }
  return _payload
}
