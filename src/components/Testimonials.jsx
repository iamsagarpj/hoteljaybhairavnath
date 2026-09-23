import { m } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { fadeUp, stagger } from './ui/motion.js'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { testimonials } from '../data/testimonials.js'
import { hotel } from '../data/hotel.js'
import { whatsappUrl } from '../lib/contact.js'

const shareMessage = `Hello ${hotel.name},\n\nI stayed with you and would like to share my experience:\n\n`

export default function Testimonials() {
  return (
    <section id="stories" aria-labelledby="stories-title" className="section-pad bg-forest text-offwhite">
      <div className="container-site">
        <SectionHeading id="stories-title" tone="light" eyebrow="Guest experiences" title="Stories from the Lake" align="center" />

        {testimonials.length > 0 ? (
          <m.ul
            className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger()}
          >
            {testimonials.map((t) => (
              <m.li key={`${t.name}-${t.quote.slice(0, 12)}`} variants={fadeUp} className="border border-offwhite/15 p-8">
                <Quote className="size-6 text-accent" strokeWidth={1.3} aria-hidden="true" />
                <blockquote className="mt-5 font-serif text-2xl leading-snug text-offwhite">“{t.quote}”</blockquote>
                <p className="mt-6 text-sm font-semibold text-sand">{t.name}</p>
                {t.detail && <p className="text-sm text-offwhite/60">{t.detail}</p>}
                {t.source && (
                  <p className="mt-2 text-xs text-offwhite/65">
                    via{' '}
                    {t.sourceUrl ? (
                      <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                        {t.source}
                      </a>
                    ) : (
                      t.source
                    )}
                  </p>
                )}
              </m.li>
            ))}
          </m.ul>
        ) : (
          <Reveal className="mx-auto mt-10 max-w-xl text-center">
            <Quote className="mx-auto size-8 text-accent" strokeWidth={1.2} aria-hidden="true" />
            <p className="mt-6 font-serif text-2xl leading-snug text-offwhite/90 sm:text-3xl">
              We’re collecting stories from our guests. Stayed with us? We’d love to hear about your trip.
            </p>
            <a href={whatsappUrl(shareMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light mt-9">
              <WhatsAppIcon className="size-4" /> Share Your Experience
            </a>
          </Reveal>
        )}
      </div>
    </section>
  )
}
