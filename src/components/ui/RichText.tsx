import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
  className?: string
}

export function RichText({ data, className }: Props) {
  if (!data) return null
  const html = convertLexicalToHTML({ data: data as SerializedEditorState, disableContainer: true })
  if (!html) return null
  return (
    <div
      className={`prose ${className ?? ''}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
