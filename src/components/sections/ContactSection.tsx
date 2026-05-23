import { ContactForm } from './ContactForm'

type Props = {
  heading: string
  intro: string
  email?: string | null
  phone?: string | null
  suburb?: string
  state?: string
  postcode?: string
  facebook?: string | null
  instagram?: string | null
  mapEmbedUrl?: string | null
  formEnabled?: boolean
}

export function ContactSection({
  heading,
  intro,
  email,
  phone,
  suburb = 'Kenmore',
  state = 'QLD',
  postcode = '4069',
  formEnabled = false,
  facebook,
  instagram,
  mapEmbedUrl,
}: Props) {
  const mapsUrl = `https://maps.google.com/?q=Brisbane+West+Toy+Library+${suburb}+${state}`

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1f52b8 100%)' }}
    >
      <div className="container-site">
        <div className="text-center mb-12">
          <p className="text-mint/70 text-xs tracking-[0.18em] uppercase font-semibold mb-3">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{heading}</h2>
          <p className="text-mint/80 text-lg max-w-xl mx-auto">{intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="flex flex-col gap-5">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 text-white hover:text-yellow transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  ✉
                </span>
                <span className="font-semibold">{email}</span>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 text-white hover:text-yellow transition-colors group"
              >
                <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl flex-shrink-0 group-hover:bg-white/20 transition-colors">
                  📞
                </span>
                <span className="font-semibold">{phone}</span>
              </a>
            )}
            <div className="flex items-center gap-4 text-white">
              <span className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-xl flex-shrink-0">
                📍
              </span>
              <span className="font-semibold">{suburb}, {state} {postcode}</span>
            </div>

            {(facebook || instagram) && (
              <div className="flex gap-3 mt-2">
                {facebook && (
                  <a
                    href={facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold hover:bg-white/20 transition-colors"
                  >
                    f
                  </a>
                )}
                {instagram && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm hover:bg-white/20 transition-colors"
                  >
                    IG
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-white/5">
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Brisbane West Toy Library map"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-mint/60">
                <span className="text-5xl">📍</span>
                <p className="font-semibold text-white/70">{suburb}, {state}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-mint hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            )}
          </div>
        </div>

        {formEnabled && (
          <div className="mt-12 pt-10 border-t border-white/10">
            <h3 className="text-white font-bold text-xl mb-6">Send us a message</h3>
            <div className="max-w-2xl">
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
