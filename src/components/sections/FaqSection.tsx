import { FaqAccordion } from '@/components/ui/FaqAccordion'

type FaqItem = { question: string; answerHtml: string }
type FaqCategory = { label: string; items: FaqItem[] }

type Props = {
  categories: FaqCategory[]
  heading?: string
  sectionLabel?: string
}

export function FaqSection({
  categories,
  heading = 'Frequently Asked Questions',
  sectionLabel = 'Help',
}: Props) {
  return (
    <section id="faq" className="section-pad" style={{ backgroundColor: 'var(--palette-sky)' }}>
      <div className="container-site">
        <div className="mb-10">
          <p className="section-label mb-3">{sectionLabel}</p>
          <h2 className="text-3xl md:text-4xl font-black text-dark">{heading}</h2>
        </div>
        {categories.length === 0 ? (
          <p className="text-muted">No FAQs yet — check back soon!</p>
        ) : (
          <div className="max-w-2xl">
            <FaqAccordion categories={categories} />
          </div>
        )}
      </div>
    </section>
  )
}
