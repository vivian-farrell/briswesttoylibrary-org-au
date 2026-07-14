import { getPayloadClient } from '@/lib/payload'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { LocationSection } from '@/components/sections/LocationSection'
import { WhatIsAToyLibrary } from '@/components/sections/WhatIsAToyLibrary'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { MembershipSection } from '@/components/sections/MembershipSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { NewsPreview } from '@/components/sections/NewsPreview'
import { ContactSection } from '@/components/sections/ContactSection'
import { SectionDotNav } from '@/components/layout/SectionDotNav'
import { postCategoryLabel } from '@/lib/postCategories'

export const revalidate = 3600

const CATEGORY_ORDER = ['membership', 'borrowing', 'toys', 'volunteering', 'general']
const CATEGORY_LABELS: Record<string, string> = {
  membership: 'Membership',
  borrowing: 'Borrowing',
  toys: 'Toys',
  volunteering: 'Volunteering',
  general: 'General',
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [homepage, settings, membership, postsResult, faqsResult] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'membership-page' }).catch(() => null),
    payload
      .find({
        collection: 'posts',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 3,
      })
      .catch(() => ({ docs: [] })),
    payload
      .find({
        collection: 'faqs',
        sort: 'order',
        limit: 100,
      })
      .catch(() => ({ docs: [] })),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hp = homepage as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const st = settings as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mp = membership as any

  const heroSlides = ((hp?.heroSlides ?? []) as any[])
    .map((s: any) => ({
      url: typeof s.image === 'object' && s.image?.url ? (s.image.url as string) : '',
      alt: typeof s.image === 'object' ? (s.image?.alt ?? '') : '',
    }))
    .filter(s => s.url)

  const heroVideoUrl =
    hp?.heroType === 'video' && typeof hp?.heroVideo === 'object'
      ? (hp.heroVideo?.url as string | undefined)
      : undefined

  const aboutImageUrl =
    typeof hp?.aboutSection?.image === 'object'
      ? (hp.aboutSection.image?.url as string | undefined)
      : undefined
  const aboutImageAlt =
    typeof hp?.aboutSection?.image === 'object'
      ? (hp.aboutSection.image?.alt as string | undefined)
      : undefined

  const howItWorksSteps = ((hp?.howItWorksSection?.steps ?? []) as any[]).map((s: any) => ({
    heading: s.heading as string,
    body: s.body as string,
    imageUrl: typeof s.image === 'object' ? (s.image?.url as string | undefined) : undefined,
    imageAlt: typeof s.image === 'object' ? (s.image?.alt as string | undefined) : undefined,
  }))

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = ((postsResult as any).docs ?? []).map((p: any) => ({
    title: p.title as string,
    slug: p.slug as string,
    excerpt: p.excerpt as string | null,
    publishedAt: p.publishedAt as string | null,
    category: postCategoryLabel(p.category as string | null),
  }))

  // Group FAQs by category
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqs: any[] = (faqsResult as any).docs ?? []
  const grouped: Record<string, { question: string; answerHtml: string }[]> = {}
  for (const faq of faqs) {
    const cat: string = faq.category ?? 'general'
    if (!grouped[cat]) grouped[cat] = []
    const answerHtml = faq.answer
      ? convertLexicalToHTML({ data: faq.answer as SerializedEditorState, disableContainer: true })
      : ''
    grouped[cat].push({ question: faq.question as string, answerHtml })
  }
  const faqCategories = CATEGORY_ORDER
    .filter(cat => grouped[cat]?.length)
    .map(cat => ({ label: CATEGORY_LABELS[cat] ?? cat, items: grouped[cat] }))
  for (const cat of Object.keys(grouped)) {
    if (!CATEGORY_ORDER.includes(cat)) {
      faqCategories.push({ label: CATEGORY_LABELS[cat] ?? cat, items: grouped[cat] })
    }
  }

  return (
    <>
      <SectionDotNav />

      {heroVideoUrl ? (
        <HeroVideo
          videoUrl={heroVideoUrl}
          subtitle={hp?.heroSubtitle ?? "Kenmore · Brisbane's West · Since 1978"}
          headline={hp?.heroHeadline ?? 'Toys. Imagination. Community.'}
          tagline={hp?.heroTagline ?? "Borrow quality toys for your child's world — sustainably, affordably, together."}
          ctaLabel={hp?.heroCTALabel ?? 'Join Now'}
          ctaHref={hp?.heroCTAHref ?? '/#membership'}
          scrollLabel={hp?.scrollLabel}
        />
      ) : (
        <HeroCarousel
          slides={heroSlides}
          subtitle={hp?.heroSubtitle ?? "Kenmore · Brisbane's West · Since 1978"}
          headline={hp?.heroHeadline ?? 'Toys. Imagination. Community.'}
          tagline={hp?.heroTagline ?? "Borrow quality toys for your child's world — sustainably, affordably, together."}
          ctaLabel={hp?.heroCTALabel ?? 'Join Now'}
          ctaHref={hp?.heroCTAHref ?? '/#membership'}
          scrollLabel={hp?.scrollLabel}
        />
      )}

      <LocationSection
        heading={hp?.locationSection?.heading ?? "We're in Kenmore"}
        suburb={hp?.locationSection?.suburb ?? 'Kenmore'}
        state={hp?.locationSection?.state ?? 'QLD'}
        postcode={hp?.locationSection?.postcode ?? '4069'}
        street={hp?.locationSection?.street}
        openingHours={hp?.locationSection?.openingHours ?? []}
        mapEmbedUrl={hp?.locationSection?.mapEmbedUrl}
        directionsUrl={hp?.locationSection?.directionsUrl}
        sectionLabel={hp?.locationSection?.sectionLabel}
        openingHoursLabel={hp?.locationSection?.openingHoursLabel}
        directionsLabel={hp?.locationSection?.directionsLabel}
        mapsLabel={hp?.locationSection?.mapsLabel}
      />

      <WhatIsAToyLibrary
        heading={hp?.aboutSection?.heading ?? 'More toys. Less clutter. More community.'}
        body={
          hp?.aboutSection?.body ??
          'A toy library is exactly what it sounds like — a library for toys. Members pay a small annual fee and borrow quality educational toys, puzzles, games, and outdoor equipment, returning them when their child is ready for something new.'
        }
        imageUrl={aboutImageUrl}
        imageAlt={aboutImageAlt}
        sectionLabel={hp?.aboutSection?.sectionLabel}
        features={hp?.aboutSection?.features}
      />

      <HowItWorksSection
        steps={howItWorksSteps}
        sectionLabel={hp?.howItWorksSection?.sectionLabel}
        heading={hp?.howItWorksSection?.heading}
      />

      <MembershipSection
        heading={hp?.membershipSection?.heading ?? 'Simple, affordable membership'}
        subheading={
          hp?.membershipSection?.subheading ??
          'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.'
        }
        tiers={mp?.tiers ?? []}
        trial={mp?.trial}
        sectionLabel={hp?.membershipSection?.sectionLabel}
        popularBadge={hp?.membershipSection?.popularBadge}
        disclaimer={hp?.membershipSection?.disclaimer}
      />

      <FaqSection
        categories={faqCategories}
        heading={hp?.faqSection?.heading}
        sectionLabel={hp?.faqSection?.sectionLabel}
      />

      <NewsPreview
        posts={posts}
        sectionLabel={hp?.newsSection?.sectionLabel}
        heading={hp?.newsSection?.heading}
        allNewsLabel={hp?.newsSection?.allNewsLabel}
      />

      <ContactSection
        heading={hp?.contactSection?.heading ?? "We'd love to hear from you"}
        intro={
          hp?.contactSection?.intro ??
          'Questions about membership, toys, or volunteering? Drop us a line.'
        }
        email={st?.email}
        phone={st?.phone}
        suburb={hp?.locationSection?.suburb ?? 'Kenmore'}
        state={hp?.locationSection?.state ?? 'QLD'}
        postcode={hp?.locationSection?.postcode ?? '4069'}
        facebook={st?.socialLinks?.facebook}
        instagram={st?.socialLinks?.instagram}
        formEnabled={hp?.contactSection?.formEnabled ?? false}
        sectionLabel={hp?.contactSection?.sectionLabel}
        formHeading={hp?.contactSection?.formHeading}
      />
    </>
  )
}
