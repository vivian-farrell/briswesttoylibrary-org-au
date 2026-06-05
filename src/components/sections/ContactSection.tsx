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
  formEnabled?: boolean
  sectionLabel?: string
  formHeading?: string
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
  sectionLabel = 'Get In Touch',
  formHeading = 'Send us a message',
}: Props) {

  return (
    <section
      id="contact"
      className="section-pad"
      style={{ background: 'var(--palette-pink)' }}
    >
      <div className="container-site">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{heading}</h2>
          <p className="text-white/85 text-lg max-w-xl mx-auto">{intro}</p>
        </div>

        <div className="max-w-md mx-auto text-center text-white/90 text-lg leading-loose">
          <p>{suburb}, {state} {postcode}</p>
          {email && (
            <p><a href={`mailto:${email}`} className="hover:text-yellow transition-colors">{email}</a></p>
          )}
          {phone && (
            <p><a href={`tel:${phone}`} className="hover:text-yellow transition-colors">{phone}</a></p>
          )}
          {(facebook || instagram) && (
            <div className="flex justify-center gap-3 mt-4">
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold hover:bg-white/20 transition-colors"
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
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm hover:bg-white/20 transition-colors"
                >
                  IG
                </a>
              )}
            </div>
          )}
        </div>

        {formEnabled && (
          <div className="mt-12 pt-10 border-t border-white/10">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-white font-bold text-xl mb-6">{formHeading}</h3>
              <ContactForm />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
