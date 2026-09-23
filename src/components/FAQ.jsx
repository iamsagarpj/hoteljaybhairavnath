import { useId, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { faqs } from '../data/faq.js'

const EASE = [0.22, 1, 0.36, 1]
const LABELS = { region: 'Regional information', hotel: 'From the hotel' }

function Item({ faq, open, onToggle }) {
  const id = useId()
  return (
    <li className="border-b border-forest-deep/10">
      <h3 className="font-sans">
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium text-charcoal transition-colors hover:text-forest-deep"
        >
          {faq.q}
          <Plus
            className={`size-5 shrink-0 text-earth-dark transition-transform duration-500 ease-[var(--ease-premium)] ${open ? 'rotate-45' : ''}`}
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pr-10 pb-7">
              {faq.a.map((part) => (
                <div key={part.text}>
                  <p className={`eyebrow text-[0.62rem] ${part.type === 'hotel' ? 'text-forest' : 'text-earth-dark'}`}>{LABELS[part.type]}</p>
                  <p className="mt-1.5 leading-relaxed text-charcoal/75">{part.text}</p>
                </div>
              ))}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad">
      <div className="container-site grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Before You Go" intro="Regional information is general guidance and can change. For anything hotel-specific, just ask us." />
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <ul className="border-t border-forest-deep/10">
            {faqs.map((faq, i) => (
              <Item key={faq.q} faq={faq} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
