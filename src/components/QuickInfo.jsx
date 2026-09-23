import { m } from 'framer-motion'
import { BedDouble, Mountain, Sailboat, UtensilsCrossed } from 'lucide-react'
import { fadeUp, stagger } from './ui/motion.js'

const items = [
  { icon: BedDouble, label: 'Stay', text: 'Comfortable stays', href: '#stay' },
  { icon: UtensilsCrossed, label: 'Dine', text: 'Authentic local food', href: '#dining' },
  { icon: Sailboat, label: 'Sail', text: 'Shivsagar boating', href: '#boating' },
  { icon: Mountain, label: 'Explore', text: 'Vasota trek', href: '#vasota' },
]

export default function QuickInfo() {
  return (
    <section id="intro" aria-label="What you can do in Bamnoli" className="relative border-b border-forest-deep/10 bg-offwhite">
      <m.ul
        className="container-site grid grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        variants={stagger(0.08)}
      >
        {items.map(({ icon: Icon, label, text, href }, i) => (
          <m.li
            key={label}
            variants={fadeUp}
            className={`border-forest-deep/10 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} lg:border-r lg:last:border-r-0`}
          >
            <a href={href} className="group flex h-full flex-col gap-4 px-2 py-8 sm:flex-row sm:items-center sm:px-6 lg:py-10">
              <span className="flex size-12 shrink-0 items-center justify-center border border-earth/30 text-earth-dark transition-colors duration-300 group-hover:border-forest-deep group-hover:bg-forest-deep group-hover:text-sand">
                <Icon className="size-5" strokeWidth={1.4} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-serif text-2xl leading-none text-forest-deep">{label}</span>
                <span className="mt-1.5 block text-sm text-charcoal/70">{text}</span>
              </span>
            </a>
          </m.li>
        ))}
      </m.ul>
    </section>
  )
}
