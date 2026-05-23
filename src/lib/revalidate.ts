import type { GlobalAfterChangeHook, CollectionAfterChangeHook } from 'payload'

/** Revalidate one or more Next.js paths after a Payload document changes. */
export function makeRevalidateHook(paths: string[]): GlobalAfterChangeHook {
  return async () => {
    try {
      const { revalidatePath } = await import('next/cache')
      paths.forEach(p => revalidatePath(p))
    } catch {}
  }
}

/** Revalidate all pages — use for site-wide globals (nav, footer, settings). */
export function makeRevalidateAllHook(): GlobalAfterChangeHook {
  return async () => {
    try {
      const { revalidatePath } = await import('next/cache')
      revalidatePath('/', 'layout')
    } catch {}
  }
}

/** Collection variant — receives doc. */
export function makeCollectionRevalidateHook(
  getPaths: (doc: Record<string, unknown>) => string[],
): CollectionAfterChangeHook {
  return async ({ doc }) => {
    try {
      const { revalidatePath } = await import('next/cache')
      getPaths(doc as Record<string, unknown>).forEach(p => revalidatePath(p))
    } catch {}
  }
}
