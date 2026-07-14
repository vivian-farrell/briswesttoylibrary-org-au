type OpeningHour = { day: string; hours: string }

type Props = {
  heading: string
  suburb: string
  state: string
  postcode: string
  street?: string | null
  openingHours?: OpeningHour[]
  mapEmbedUrl?: string | null
  directionsUrl?: string | null
  sectionLabel?: string
  openingHoursLabel?: string
  directionsLabel?: string
  mapsLabel?: string
}

const FALLBACK_HOURS: OpeningHour[] = [
  { day: 'Saturday', hours: '9:00 am – 12:00 pm' },
  { day: 'Tuesday',  hours: '6:00 pm – 8:00 pm' },
]

export function LocationSection({
  heading,
  suburb,
  state,
  postcode,
  street,
  openingHours,
  mapEmbedUrl,
  directionsUrl,
  sectionLabel = 'Find Us',
  openingHoursLabel = 'Opening Hours',
  directionsLabel = 'Get Directions →',
  mapsLabel = 'View on Google Maps',
}: Props) {
  const hours = openingHours && openingHours.length > 0 ? openingHours : FALLBACK_HOURS
  const mapsUrl = directionsUrl ?? `https://maps.google.com/?q=Brisbane+West+Toy+Library+${suburb}+${state}`

  return (
    <section id="location" className="section-pad" style={{ backgroundColor: 'var(--palette-yellow)' }}>
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-label mb-3">{sectionLabel}</p>
            <h2 className="text-3xl md:text-4xl font-black text-dark mb-6">{heading}</h2>

            {street && <p className="text-muted mb-1">{street}</p>}
            <p className="text-2xl font-bold text-forest mb-8">
              {suburb}, {state} {postcode}
            </p>

            <div className="mb-8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-muted mb-4">{openingHoursLabel}</h3>
              <ul className="flex flex-col gap-3">
                {hours.map(h => (
                  <li key={h.day} className="flex items-baseline gap-3">
                    <span className="font-semibold text-dark w-28 flex-shrink-0">{h.day}</span>
                    <span className="text-muted">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-forest text-white font-bold px-7 py-3.5 rounded-full hover:brightness-110 transition-all"
            >
              {directionsLabel}
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-mint/20">
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Brisbane West Toy Library location"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted">
                <span className="text-5xl">📍</span>
                <p className="font-semibold text-dark">{suburb}, {state}</p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green hover:underline"
                >
                  {mapsLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
