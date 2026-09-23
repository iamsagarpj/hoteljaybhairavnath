import { ArrowUp, MapPin } from 'lucide-react'
import Logo from './Logo.jsx'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './ui/Icons.jsx'
import { hotel, navLinks } from '../data/hotel.js'
import { allImages } from '../data/images.js'
import { hasPhone, displayPhone, mapsSearchUrl, simpleMessage, telUrl, whatsappUrl } from '../lib/contact.js'

const experiences = [
  { label: 'Stay in Bamnoli', href: '#stay' },
  { label: 'Local food', href: '#dining' },
  { label: 'Shivsagar boating', href: '#boating' },
  { label: 'Vasota trek', href: '#vasota' },
  { label: 'Trip planner', href: '#plan' },
  { label: 'When to visit', href: '#seasons' },
  { label: 'FAQ', href: '#faq' },
]

const linkClass = 'inline-flex min-h-10 items-center text-offwhite/70 transition-colors hover:text-offwhite'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-forest-deep pb-24 text-offwhite md:pb-0">
      <div className="container-site py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" size="lg" />
            <p className="mt-6 font-serif text-2xl text-sand italic">{hotel.tagline}</p>
            <p className="mt-2 text-offwhite/60">Bamnoli, Satara, Maharashtra</p>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-offwhite/60">Made for slow mornings, wild trails and unforgettable journeys.</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="eyebrow text-[0.68rem] text-sand">Navigate</h2>
              <ul className="mt-5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow text-[0.68rem] text-sand">Experiences</h2>
              <ul className="mt-5">
                {experiences.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={linkClass}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h2 className="eyebrow text-[0.68rem] text-sand">Contact</h2>
              <ul className="mt-5">
                <li>
                  <a href={whatsappUrl(simpleMessage('a trip to Bamnoli'))} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                </li>
                {hasPhone && (
                  <li>
                    <a href={telUrl} className={linkClass}>
                      {displayPhone}
                    </a>
                  </li>
                )}
                {hotel.email && (
                  <li>
                    <a href={`mailto:${hotel.email}`} className={linkClass}>
                      {hotel.email}
                    </a>
                  </li>
                )}
                <li>
                  <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                    <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" /> Google Maps
                  </a>
                </li>
                {hotel.instagramUrl && (
                  <li>
                    <a href={hotel.instagramUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                      <InstagramIcon className="size-4" /> Instagram
                    </a>
                  </li>
                )}
                {hotel.facebookUrl && (
                  <li>
                    <a href={hotel.facebookUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2.5`}>
                      <FacebookIcon className="size-4" /> Facebook
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </nav>
        </div>

        <details className="group mt-16 border-t border-offwhite/10 pt-6">
          <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm text-offwhite/60 hover:text-offwhite">
            Photo credits
            <span aria-hidden="true" className="transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-4 text-xs leading-relaxed text-offwhite/60">
            Regional photographs are from Wikimedia Commons and used under their licences. They show Bamnoli and the surrounding
            region, not the hotel. Food photos are illustrative.
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-xs text-offwhite/65 sm:grid-cols-2 lg:grid-cols-3">
            {allImages.map((img) => (
              <li key={img.id}>
                <a href={img.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-offwhite">
                  {img.alt.split(' ').slice(0, 6).join(' ')}… — {img.author}
                </a>
                ,{' '}
                {img.licenseUrl ? (
                  <a href={img.licenseUrl} target="_blank" rel="noopener noreferrer license" className="underline underline-offset-2 hover:text-offwhite">
                    {img.license}
                  </a>
                ) : (
                  img.license
                )}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 border-t border-offwhite/10 pt-8 text-sm text-offwhite/65 sm:flex-row sm:items-center">
          <p>
            © {year} {hotel.name}. All rights reserved.
          </p>
          <a href="#top" className="inline-flex min-h-11 items-center gap-2 text-offwhite/70 hover:text-offwhite">
            Back to top <ArrowUp className="size-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
