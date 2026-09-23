import { m } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { fadeUp, stagger } from './ui/motion.js'

const cards = [
  { label: 'Stay', line: 'Slow down.', image: 'bamnoli-sunset', href: '#stay', detail: 'Evenings by the water, mornings without a rush.' },
  { label: 'Food', line: 'Taste local.', image: 'food-thali', href: '#dining', detail: 'Comforting Maharashtrian flavours after a long day.' },
  { label: 'Boat', line: 'Follow the water.', image: 'boats-jetty', href: '#boating', detail: 'Out onto the Shivsagar backwaters.' },
  { label: 'Trek', line: 'Find Vasota.', image: 'vasota-ridge', href: '#vasota', detail: 'Boat, forest trail and a fort in the clouds.' },
]

export default function ExperienceCards() {
  return (
    <section aria-labelledby="escape-title" className="section-pad bg-charcoal text-offwhite">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="escape-title"
            tone="light"
            eyebrow="Stay • Taste • Explore • Sail • Trek"
            title={
              <>
                One Place.
                <span className="block italic text-sand">Many Ways to Escape.</span>
              </>
            }
          />
          <p className="max-w-sm text-offwhite/70 lg:pb-3">
            Rest by the lake, eat well, cross the backwaters and walk into the forest — all from one Bamnoli base.
          </p>
        </div>

        <m.ul
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={stagger(0.12)}
        >
          {cards.map((card, i) => (
            <m.li key={card.label} variants={fadeUp} className={i % 2 === 1 ? 'lg:mt-14' : ''}>
              <a href={card.href} className="group relative block h-[26rem] overflow-hidden sm:h-[30rem] lg:h-[34rem]">
                <Img
                  id={card.image}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-premium)] group-hover:scale-[1.07]"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 transition-transform duration-700 ease-[var(--ease-premium)] lg:translate-y-10 lg:group-hover:translate-y-0 lg:group-focus-visible:translate-y-0">
                  <p className="eyebrow text-sand">{card.label}</p>
                  <h3 className="mt-3 flex items-end justify-between gap-4 text-[2.25rem] text-offwhite">
                    {card.line}
                    <ArrowUpRight className="mb-2 size-5 shrink-0 text-sand" strokeWidth={1.5} aria-hidden="true" />
                  </h3>
                  <p className="mt-3 text-sm text-offwhite/75 transition-opacity duration-700 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">
                    {card.detail}
                  </p>
                </div>
              </a>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  )
}
