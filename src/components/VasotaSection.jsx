import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Img from './ui/Img.jsx'
import Reveal, { ImageReveal } from './ui/Reveal.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { hotel } from '../data/hotel.js'
import { whatsappUrl } from '../lib/contact.js'

const journey = [
  { title: 'Arrive at Bamnoli', text: 'Reach the village early — ideally the evening before.' },
  { title: 'Boat across the backwaters', text: 'Cross Shivsagar Lake, roughly an hour or more each way.' },
  { title: 'Reach the trail base', text: 'Step ashore where the forest path begins.' },
  { title: 'Jungle trek', text: 'Walk through dense evergreen forest of the Koyna sanctuary.' },
  { title: 'Explore Vasota', text: 'Ramparts, ruins and sweeping views over the Sahyadris.' },
  { title: 'Return by boat', text: 'Back across the water to Bamnoli before evening.' },
]

const facts = [
  'Day trip only — overnight stays on the fort are not allowed.',
  'Inside the Koyna Wildlife Sanctuary: Forest Department entry and photo ID required.',
  'Generally closed during the monsoon; reopens after (1 November in 2025).',
  'No food or water on the fort — carry your own and bring your waste back.',
]

const vasotaMessage = `Hello ${hotel.name},\n\nI'm planning a Vasota trek from Bamnoli.\n\nDate:\nNumber of people:\nStay the night before: Yes / No\n\nCould you share current details on boats, forest entry and trek timings?`

export default function VasotaSection() {
  const lineRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ['start 80%', 'end 60%'] })
  const progress = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1])

  return (
    <section id="vasota" aria-labelledby="vasota-title" className="section-pad relative overflow-hidden bg-forest-deep text-offwhite">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5 flex items-center gap-4 text-sand">
                <span aria-hidden="true" className="h-px w-8 bg-accent" />
                Vasota trek
              </p>
              <h2 id="vasota-title" className="text-[2.75rem] leading-[1.02] text-offwhite sm:text-6xl">
                From the Backwaters to <span className="italic text-sand">Vasota</span>
              </h2>
              <p className="mt-6 font-serif text-2xl leading-snug text-sand/90 italic">
                Boat across the backwaters. Walk through the forest. Discover Vasota.
              </p>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-offwhite/75">
                Vasota Fort rises from the forests of the Koyna Wildlife Sanctuary. The usual way in is from Bamnoli: a boat
                across the reservoir, then a trek through the jungle to the fort — subject to forest permissions and current
                operating rules.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ImageReveal className="aspect-[4/3] lg:aspect-[16/11]">
              <Img id="vasota-ridge" sizes="(min-width: 1024px) 55vw, 100vw" className="size-full object-cover" />
            </ImageReveal>
          </div>
        </div>

        <div ref={lineRef} className="relative mt-20 lg:mt-28">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-[1.1rem] w-px bg-offwhite/15 lg:top-[1.1rem] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-full" />
          <m.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute top-0 bottom-0 left-[1.1rem] w-px origin-top bg-accent lg:hidden"
          />
          <m.div
            aria-hidden="true"
            style={{ scaleX: progress }}
            className="absolute top-[1.1rem] right-0 left-0 hidden h-px origin-left bg-accent lg:block"
          />
          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {journey.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06} className="flex gap-6 lg:flex-col lg:gap-5">
                <span className="relative z-10 flex size-9 shrink-0 items-center justify-center border border-accent bg-forest-deep font-serif text-sm text-sand">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-2xl leading-tight text-offwhite">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-offwhite/65">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-20 grid gap-10 border-t border-offwhite/10 pt-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h3 className="eyebrow text-sand">Good to know</h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {facts.map((f) => (
                <li key={f} className="border-l border-accent/60 pl-4 text-offwhite/80">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-5 lg:col-span-5 lg:items-end lg:text-right">
            <a href={whatsappUrl(vasotaMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-gold w-full sm:w-auto">
              <WhatsAppIcon className="size-4" /> Enquire About Vasota Trek
            </a>
            <p className="flex max-w-md items-start gap-3 text-sm leading-relaxed text-offwhite/65 lg:flex-row-reverse">
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
              Availability, forest permissions, boat schedules and trek access can vary. Confirm before booking.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
