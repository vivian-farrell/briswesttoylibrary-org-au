import { getPayloadClient } from '@/lib/payload'
import { HeroCarousel } from '@/components/sections/HeroCarousel'
import { HeroVideo } from '@/components/sections/HeroVideo'
import { LocationSection } from '@/components/sections/LocationSection'
import { WhatIsAToyLibrary } from '@/components/sections/WhatIsAToyLibrary'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { MembershipSection } from '@/components/sections/MembershipSection'
import { NewsPreview } from '@/components/sections/NewsPreview'
import { ContactSection } from '@/components/sections/ContactSection'
import { SectionDotNav } from '@/components/layout/SectionDotNav'

export const revalidate = 3600

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [homepage, settings, membership, contactPage, postsResult] = await Promise.all([
    payload.findGlobal({ slug: 'homepage' }).catch(() => null),
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null),
    payload.findGlobal({ slug: 'membership-page' }).catch(() => null),
    payload.findGlobal({ slug: 'contact-page' }).catch(() => null),
    payload
      .find({
        collection: 'posts',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 3,
      })
      .catch(() => ({ docs: [] })),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hp = homepage as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const st = settings as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mp = membership as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cp = contactPage as any

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const posts = ((postsResult as any).docs ?? []).map((p: any) => ({
    title: p.title as string,
    slug: p.slug as string,
    excerpt: p.excerpt as string | null,
    publishedAt: p.publishedAt as string | null,
    category: p.category as string | null,
  }))

  return (
    <>
      <SectionDotNav />

      {heroVideoUrl ? (
        <HeroVideo
          videoUrl={heroVideoUrl}
          headline={hp?.heroHeadline ?? 'Toys. Imagination. Community.'}
          tagline={hp?.heroTagline ?? "Borrow quality toys for your child's world — sustainably, affordably, together."}
          ctaLabel={hp?.heroCTALabel ?? 'Join Now'}
          ctaHref={hp?.heroCTAHref ?? '/#membership'}
        />
      ) : (
        <HeroCarousel
          slides={heroSlides}
          headline={hp?.heroHeadline ?? 'Toys. Imagination. Community.'}
          tagline={hp?.heroTagline ?? "Borrow quality toys for your child's world — sustainably, affordably, together."}
          ctaLabel={hp?.heroCTALabel ?? 'Join Now'}
          ctaHref={hp?.heroCTAHref ?? '/#membership'}
        />
      )}

      <LocationSection
        heading={hp?.locationSection?.heading ?? "We're in Kenmore"}
        suburb={st?.address?.suburb ?? 'Kenmore'}
        state={st?.address?.state ?? 'QLD'}
        postcode={st?.address?.postcode ?? '4069'}
        street={st?.address?.street}
        openingHours={st?.openingHours ?? []}
        mapEmbedUrl={hp?.locationSection?.mapEmbedUrl}
        directionsUrl={hp?.locationSection?.directionsUrl}
      />

      <WhatIsAToyLibrary
        heading={hp?.aboutSection?.heading ?? 'More toys. Less clutter. More community.'}
        body={
          hp?.aboutSection?.body ??
          'A toy library is exactly what it sounds like — a library for toys. Members pay a small annual fee and borrow quality educational toys, puzzles, games, and outdoor equipment, returning them when their child is ready for something new.'
        }
        imageUrl={aboutImageUrl}
        imageAlt={aboutImageAlt}
      />

      <HowItWorksSection steps={hp?.howItWorksSection?.steps ?? []} />

      <MembershipSection
        heading={hp?.membershipSection?.heading ?? 'Simple, affordable membership'}
        subheading={
          hp?.membershipSection?.subheading ??
          'One annual fee. Unlimited borrowing. No hidden costs. Concession rates available.'
        }
        tiers={mp?.tiers ?? []}
      />

      <NewsPreview posts={posts} />

      <ContactSection
        heading={hp?.contactSection?.heading ?? "We'd love to hear from you"}
        intro={
          hp?.contactSection?.intro ??
          'Questions about membership, toys, or volunteering? Drop us a line.'
        }
        email={st?.email}
        phone={st?.phone}
        suburb={st?.address?.suburb ?? 'Kenmore'}
        state={st?.address?.state ?? 'QLD'}
        postcode={st?.address?.postcode ?? '4069'}
        facebook={st?.socialLinks?.facebook}
        instagram={st?.socialLinks?.instagram}
        formEnabled={cp?.formEnabled ?? false}
      />
    </>
  )
}
