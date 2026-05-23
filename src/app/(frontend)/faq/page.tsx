import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { FaqAccordion } from '@/components/ui/FaqAccordion'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'FAQ | Brisbane West Toy Library',
  description: 'Frequently asked questions about Brisbane West Toy Library — membership, borrowing, toys, and more.',
}

const CATEGORY_ORDER = ['membership', 'borrowing', 'toys', 'volunteering', 'general']
const CATEGORY_LABELS: Record<string, string> = {
  membership: 'Membership',
  borrowing: 'Borrowing',
  toys: 'Toys',
  volunteering: 'Volunteering',
  general: 'General',
}

export default async function FaqPage() {
  const payload = await getPayloadClient()
  const result = await payload
    .find({
      collection: 'faqs',
      sort: 'order',
      limit: 100,
    })
    .catch(() => ({ docs: [] }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqs: any[] = (result as any).docs ?? []

  // Group by category
  const grouped: Record<string, { question: string; answerHtml: string }[]> = {}
  for (const faq of faqs) {
    const cat: string = faq.category ?? 'general'
    if (!grouped[cat]) grouped[cat] = []
    const answerHtml = faq.answer
      ? convertLexicalToHTML({ data: faq.answer as SerializedEditorState, disableContainer: true })
      : ''
    grouped[cat].push({ question: faq.question as string, answerHtml })
  }

  const categories = CATEGORY_ORDER
    .filter(cat => grouped[cat]?.length)
    .map(cat => ({ label: CATEGORY_LABELS[cat] ?? cat, items: grouped[cat] }))

  // Also include any categories not in CATEGORY_ORDER
  for (const cat of Object.keys(grouped)) {
    if (!CATEGORY_ORDER.includes(cat)) {
      categories.push({ label: CATEGORY_LABELS[cat] ?? cat, items: grouped[cat] })
    }
  }

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-12">
          <p className="section-label mb-3">Help</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted text-lg max-w-xl">
            Can&apos;t find your answer here? Feel free to{' '}
            <a href="/contact" className="text-forest underline">contact us</a>.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-muted">No FAQs yet — check back soon!</p>
        ) : (
          <div className="max-w-2xl">
            <FaqAccordion categories={categories} />
          </div>
        )}
      </div>
    </div>
  )
}
