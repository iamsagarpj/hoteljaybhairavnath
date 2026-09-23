import { useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Check } from 'lucide-react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { packageFilters, packages } from '../data/packages.js'
import { whatsappUrl } from '../lib/contact.js'

const EASE = [0.22, 1, 0.36, 1]

function PackageCard({ pkg }) {
  return (
    <article className="group flex h-full flex-col border border-forest-deep/10 bg-white">
      <div className="relative overflow-hidden">
        <Img
          id={pkg.image}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          className="aspect-[16/10] w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-offwhite/95 px-3 py-1.5 font-sans text-[0.7rem] font-semibold tracking-[0.2em] text-forest-deep">
          PACKAGE {pkg.number}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="eyebrow text-[0.65rem] text-earth-dark">{pkg.idealFor}</p>
        <h3 className="mt-3 text-[2rem] leading-tight text-forest-deep">{pkg.title}</h3>
        <p className="mt-3 text-charcoal/75">{pkg.description}</p>
        <p className="mt-6 text-xs font-semibold tracking-[0.14em] text-charcoal/70 uppercase">Can include</p>
        <ul className="mt-3 space-y-2">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-charcoal/80">
              <Check className="mt-0.5 size-4 shrink-0 text-forest" strokeWidth={2} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <div className="border-t border-forest-deep/10 pt-5">
            {pkg.price ? (
              <p className="font-serif text-2xl text-forest-deep">
                ₹{pkg.price.toLocaleString('en-IN')} <span className="font-sans text-sm text-charcoal/70">{pkg.priceNote}</span>
              </p>
            ) : (
              <p className="text-sm text-charcoal/70">Final inclusions confirmed on enquiry</p>
            )}
          </div>
          <a
            href={whatsappUrl(pkg.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-4 w-full"
            aria-label={`${pkg.priceLabel} for ${pkg.title} on WhatsApp`}
          >
            <WhatsAppIcon className="size-4" /> {pkg.price ? 'Enquire Now' : pkg.priceLabel}
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Packages() {
  const [filter, setFilter] = useState('all')
  const visible = packages.filter((p) => filter === 'all' || p.tags.includes(filter))

  return (
    <section id="packages" aria-labelledby="packages-title" className="section-pad bg-sand-light/50">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="packages-title"
            eyebrow="Experiences"
            title="Choose Your Bamnoli Escape"
            intro="Package ideas to start the conversation. Tell us your dates and group, and we’ll share current prices and what’s possible."
          />
          <Reveal delay={0.1}>
            <div role="group" aria-label="Filter packages" className="flex flex-wrap gap-2">
              {packageFilters.map((f) => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={filter === f.id ? 'chip-active' : 'chip-idle'}>
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {visible.length} packages shown
        </p>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((pkg) => (
              <m.li
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <PackageCard pkg={pkg} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  )
}
