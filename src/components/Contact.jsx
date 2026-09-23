import { useState } from 'react'
import { MapPin, Navigation, Phone } from 'lucide-react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { hotel, regionFacts } from '../data/hotel.js'
import { displayPhone, hasPhone, mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl, simpleMessage, telUrl, whatsappUrl } from '../lib/contact.js'

const around = [
  { place: 'Bamnoli', detail: 'Shivsagar Lake shore' },
  { place: 'Kaas', detail: `${regionFacts.fromKaas} by road` },
  { place: 'Satara', detail: `${regionFacts.fromSatara} by road` },
  { place: 'Vasota region', detail: 'By boat across the backwaters' },
]

function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  if (loaded) {
    return (
      <iframe
        title={`Map showing ${hotel.mapsQuery}`}
        src={mapsEmbedUrl}
        className="size-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    )
  }
  return (
    <div className="relative size-full">
      <Img id="ghats-viewpoint" sizes="(min-width: 1024px) 55vw, 100vw" className="size-full object-cover" alt="" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-forest-deep/55 p-6 text-center">
        <MapPin className="size-8 text-sand" strokeWidth={1.3} aria-hidden="true" />
        <p className="font-serif text-2xl text-offwhite">Bamnoli, Satara</p>
        <button type="button" onClick={() => setLoaded(true)} className="btn btn-gold">
          Show Interactive Map
        </button>
        <p className="text-xs text-offwhite/75">Loads Google Maps</p>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-sand-light/50">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow="Contact" title="Find Us in Bamnoli" />
          <Reveal delay={0.1}>
            <address className="mt-8 not-italic">
              <p className="font-serif text-2xl text-forest-deep">{hotel.name}</p>
              <p className="mt-1 text-charcoal/75">{hotel.address || hotel.location}</p>
              {!hotel.address && <p className="mt-1 text-sm text-charcoal/70">Full address: contact us for current details.</p>}
            </address>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href={whatsappUrl(simpleMessage('staying in Bamnoli'))} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <WhatsAppIcon className="size-4" /> WhatsApp Us
              </a>
              {hasPhone ? (
                <a href={telUrl} className="btn btn-outline">
                  <Phone className="size-4" strokeWidth={1.75} /> Call {displayPhone}
                </a>
              ) : (
                <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <MapPin className="size-4" strokeWidth={1.75} /> View on Google Maps
                </a>
              )}
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline sm:col-span-2 lg:col-span-1">
                <Navigation className="size-4" strokeWidth={1.75} /> Get Directions
              </a>
            </div>
            {!hasPhone && (
              <p className="mt-4 text-sm text-charcoal/70">Phone number: information to be confirmed. Please use WhatsApp for now.</p>
            )}

            <h3 className="eyebrow mt-12 text-earth-dark">Around us</h3>
            <ul className="mt-4 divide-y divide-forest-deep/10 border-y border-forest-deep/10">
              {around.map((a) => (
                <li key={a.place} className="flex items-baseline justify-between gap-4 py-3.5">
                  <span className="font-serif text-xl text-forest-deep">{a.place}</span>
                  <span className="text-right text-sm text-charcoal/65">{a.detail}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-forest-deep sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[36rem]">
            <MapEmbed />
          </div>
          <p className="mt-3 text-xs text-charcoal/70">
            Map location is based on a search for “{hotel.mapsQuery}”. Confirm directions with the hotel before you travel.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
