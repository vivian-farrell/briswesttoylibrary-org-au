/** Returns a minimal valid Lexical editor state containing a single paragraph. */
export function makeRichText(text: string) {
  return {
    root: {
      children: [
        {
          children: [
            { detail: 0, format: 0, mode: 'normal', style: '', text, type: 'text', version: 1 },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'paragraph',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'root',
      version: 1,
    },
  }
}

/** Extracts plain text from a saved Lexical editor state. */
export function richTextToPlain(rt: unknown): string {
  if (!rt || typeof rt !== 'object') return ''
  const root = (rt as { root?: { children?: unknown[] } }).root
  if (!root?.children) return ''
  return root.children
    .flatMap((block: unknown) => {
      const b = block as { children?: unknown[] }
      return b.children ?? []
    })
    .filter((leaf: unknown) => {
      const l = leaf as { type?: string }
      return l.type === 'text'
    })
    .map((leaf: unknown) => (leaf as { text?: string }).text ?? '')
    .join('')
}
