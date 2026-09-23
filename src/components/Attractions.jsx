import { m } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { fadeUp, stagger } from './ui/motion.js'
import { attractions, distanceDisclaimer } from '../data/attractions.js'

function Card({ place, featured }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden bg-white">
      <div className="overflow-hidden">
        <Img
          id={place.image}
          sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
          className={`w-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-105 ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className={`${featured ? 'text-[2.25rem]' : 'text-[1.75rem]'} leading-tight text-forest-deep`}>{place.name}</h3>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-earth-dark">
          <div className="flex items-center gap-1.5">
            <dt>
              <MapPin className="size-4" strokeWidth={1.5} aria-label="Approx. distance" />
            </dt>
            <dd>{place.distance}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt>
              <Clock className="size-4" strokeWidth={1.5} aria-label="Approx. travel time" />
            </dt>
            <dd>{place.time}</dd>
          </div>
        </dl>
        <p className="mt-4 text-charcoal/75">{place.why}</p>
        {place.note && <p className="mt-auto pt-5 text-xs leading-relaxed text-charcoal/70">{place.note}</p>}
      </div>
    </article>
  )
}

export default function Attractions() {
  const featured = attractions.filter((a) => a.featured)
  const rest = attractions.filter((a) => !a.featured)

  return (
    <section id="nearby" aria-labelledby="nearby-title" className="section-pad bg-sand-light/50">
      <div className="container-site">
        <SectionHeading
          id="nearby-title"
          eyebrow="Explore nearby"
          title="The Sahyadris, on Your Doorstep"
          intro="Forts, wildflower plateaus, waterfalls and hill stations — Bamnoli puts the best of the Satara region within easy reach."
        />

        <m.ul className="mt-14 grid gap-5 lg:grid-cols-2" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }} variants={stagger(0.1)}>
          {featured.map((place) => (
            <m.li key={place.id} variants={fadeUp}>
              <Card place={place} featured />
            </m.li>
          ))}
        </m.ul>
        <m.ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -5% 0px' }} variants={stagger(0.06)}>
          {rest.map((place) => (
            <m.li key={place.id} variants={fadeUp}>
              <Card place={place} />
            </m.li>
          ))}
        </m.ul>
        <Reveal>
          <p className="mt-8 max-w-3xl text-sm text-charcoal/70">{distanceDisclaimer}</p>
        </Reveal>
      </div>
    </section>
  )
}
