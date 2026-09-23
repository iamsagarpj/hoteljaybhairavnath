import { m } from 'framer-motion'
import { Info } from 'lucide-react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import { fadeUp, stagger } from './ui/motion.js'
import { seasons, seasonsNote } from '../data/seasons.js'

export default function Seasons() {
  return (
    <section id="seasons" aria-labelledby="seasons-title" className="section-pad">
      <div className="container-site">
        <SectionHeading
          id="seasons-title"
          eyebrow="When to visit"
          title="Every Season Has Its Own Bamnoli"
          intro="From monsoon mist to crisp winter mornings, the lake and hills change character through the year."
        />
        <m.ol
          className="mt-14 grid gap-px bg-forest-deep/10 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={stagger(0.1)}
        >
          {seasons.map((s) => (
            <m.li key={s.id} variants={fadeUp} className="group flex flex-col bg-offwhite">
              <div className="overflow-hidden">
                <Img id={s.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <div className="p-6 sm:p-7">
                <p className="eyebrow text-[0.65rem] text-earth-dark">{s.months}</p>
                <h3 className="mt-2 text-3xl text-forest-deep">{s.name}</h3>
                <p className="mt-3 text-[0.9375rem] text-charcoal/75">{s.text}</p>
              </div>
            </m.li>
          ))}
        </m.ol>
        <p className="mt-8 flex max-w-3xl items-start gap-3 text-sm text-charcoal/65">
          <Info className="mt-0.5 size-4 shrink-0 text-earth-dark" strokeWidth={1.5} aria-hidden="true" />
          {seasonsNote}
        </p>
      </div>
    </section>
  )
}
