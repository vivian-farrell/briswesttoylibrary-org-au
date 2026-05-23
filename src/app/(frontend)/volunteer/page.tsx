import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { RichText } from '@/components/ui/RichText'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'volunteer-page' }).catch(() => null) as any
  return {
    title: `${page?.heading ?? 'Volunteer'} | Brisbane West Toy Library`,
    description: page?.intro ?? 'Help keep Brisbane West Toy Library running by volunteering a small amount of your time.',
  }
}

export default async function VolunteerPage() {
  const payload = await getPayloadClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = await payload.findGlobal({ slug: 'volunteer-page' }).catch(() => null) as any

  const heading: string = page?.heading ?? 'Volunteer With Us'
  const intro: string | null = page?.intro ?? null
  const content = page?.content ?? null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const roles: any[] = page?.roles ?? []
  const ctaLabel: string = page?.ctaLabel ?? 'Express Your Interest'
  const ctaEmail: string | null = page?.ctaEmail ?? null

  return (
    <div className="bg-cream min-h-screen">
      <div className="container-site section-pad">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Volunteering</p>
          <h1 className="text-4xl md:text-5xl font-black text-dark mb-6">{heading}</h1>
          {intro && (
            <p className="text-muted text-xl leading-relaxed">{intro}</p>
          )}
        </div>

        {content && (
          <div className="max-w-2xl mb-12">
            <RichText data={content} />
          </div>
        )}

        {!content && (
          <div className="max-w-2xl mb-12 space-y-4 text-muted leading-relaxed">
            <p>
              Brisbane West Toy Library is entirely run by volunteers. We ask all members to
              contribute a small amount of time to help keep the library running — typically
              just a couple of sessions per year.
            </p>
            <p>
              We also have committee roles and behind-the-scenes tasks for members who want
              to contribute more. Every hour of volunteer time keeps membership fees low for
              everyone.
            </p>
          </div>
        )}

        {roles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-dark mb-6">Volunteer Roles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {roles.map((role: { title: string; description?: string; commitment?: string }, i: number) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-mint/30">
                  <h3 className="font-bold text-dark text-lg mb-2">{role.title}</h3>
                  {role.description && (
                    <p className="text-muted text-sm leading-relaxed mb-3">{role.description}</p>
                  )}
                  {role.commitment && (
                    <p className="text-xs font-semibold text-green bg-mint/20 px-3 py-1 rounded-full inline-block">
                      {role.commitment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {ctaEmail && (
          <a
            href={`mailto:${ctaEmail}?subject=Volunteer%20Interest`}
            className="inline-block bg-orange text-white font-bold px-8 py-4 rounded-full hover:brightness-110 transition-all"
          >
            {ctaLabel} →
          </a>
        )}
      </div>
    </div>
  )
}
