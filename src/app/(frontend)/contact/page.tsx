import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'contact-page' }).catch(() => null) as any
  return {
    title: `${page?.heading ?? 'Contact'} | Brisbane West Toy Library`,
    description: page?.intro ?? 'Get in touch with Brisbane West Toy Library in Kenmore, Brisbane.',
  }
}

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const [page, settings, homepage] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'contact-page' }).catch(() => null) as Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'site-settings' }).catch(() => null) as Promise<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload.findGlobal({ slug: 'homepage' }).catch(() => null) as Promise<any>,
  ])

  const heading: string = page?.heading ?? 'Get In Touch'
  const intro: string | null = page?.intro ?? null

  const email: string | null = settings?.email ?? null
  const phone: string | null = settings?.phone ?? null
  const street: string | null = settings?.address?.street ?? null
  const suburb: string = settings?.address?.suburb ?? 'Kenmore'
  const state: string = settings?.address?.state ?? 'QLD'
  const postcode: string = settings?.address?.postcode ?? '4069'
  const facebook: string | null = settings?.socialLinks?.facebook ?? null
  const instagram: string | null = settings?.socialLinks?.instagram ?? null
  const mapEmbedUrl: string | null = homepage?.locationSection?.mapEmbedUrl ?? null
  const openingHours: { day: string; hours: string }[] = settings?.openingHours ?? []

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="mb-12">
          <p className="section-label mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-4">{heading}</h1>
          {intro && (
            <p className="text-muted text-xl leading-relaxed max-w-xl">{intro}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="flex flex-col gap-6">
            {(email || phone) && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-mint/20">
                <h2 className="font-bold text-dark text-lg mb-4">Contact Details</h2>
                <div className="flex flex-col gap-3">
                  {email && (
                    <a href={`mailto:${email}`} className="flex items-center gap-3 text-forest hover:underline">
                      <span className="text-xl flex-shrink-0">✉️</span>
                      <span className="font-medium">{email}</span>
                    </a>
                  )}
                  {phone && (
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-forest hover:underline">
                      <span className="text-xl flex-shrink-0">📞</span>
                      <span className="font-medium">{phone}</span>
                    </a>
                  )}
                  {(facebook || instagram) && (
                    <div className="flex gap-3 mt-2">
                      {facebook && (
                        <a
                          href={facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-wider text-forest bg-mint/25 px-3 py-1.5 rounded-full hover:bg-mint/40 transition-colors"
                        >
                          Facebook
                        </a>
                      )}
                      {instagram && (
                        <a
                          href={instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-bold uppercase tracking-wider text-forest bg-mint/25 px-3 py-1.5 rounded-full hover:bg-mint/40 transition-colors"
                        >
                          Instagram
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-mint/20">
              <h2 className="font-bold text-dark text-lg mb-4">Location</h2>
              <div className="flex flex-col gap-1 text-muted">
                {street && <p>{street}</p>}
                <p>{suburb} {state} {postcode}</p>
              </div>
              {openingHours.length > 0 && (
                <div className="mt-4 pt-4 border-t border-mint/20">
                  <p className="font-semibold text-dark text-sm mb-2">Opening Hours</p>
                  <div className="flex flex-col gap-1.5">
                    {openingHours.map(({ day, hours }) => (
                      <div key={day} className="flex justify-between text-sm gap-4">
                        <span className="font-medium text-dark">{day}</span>
                        <span className="text-muted">{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          {mapEmbedUrl ? (
            <div className="rounded-2xl overflow-hidden shadow-sm border border-mint/20 h-80 lg:h-auto">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full min-h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map — ${suburb} Toy Library`}
              />
            </div>
          ) : (
            <div className="bg-mint/20 rounded-2xl flex items-center justify-center text-muted h-80 text-center px-6">
              <p>Map coming soon — find us in {suburb}, {state}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
