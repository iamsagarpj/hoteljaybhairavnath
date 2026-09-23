import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Compass, Mountain, Waves } from 'lucide-react'
import Img from './ui/Img.jsx'
import Reveal from './ui/Reveal.jsx'
import { fadeUp, stagger } from './ui/motion.js'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { hotel } from '../data/hotel.js'
import { whatsappUrl } from '../lib/contact.js'
import { usePlanner } from '../context/planner.js'

const features = [
  { icon: Waves, title: 'Scenic backwater journey', text: 'Glide across the wide, quiet waters of the Koyna reservoir.' },
  { icon: Mountain, title: 'Mountain views', text: 'Forested Sahyadri ridges and flat-topped hills all around.' },
  { icon: Compass, title: 'Vasota access', text: 'Boats from Bamnoli carry trekkers towards the Vasota trail.' },
]

const boatMessage = `Hello ${hotel.name},\n\nI'd like to plan a boat trip at Bamnoli.\n\nDate:\nNumber of people:\nLeisure boating or Vasota trek:\n\nPlease share current timings and details.`

export default function BoatingSection() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { openPlanner } = usePlanner()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <section id="boating" aria-labelledby="boating-title" className="bg-offwhite">
      <div ref={ref} className="relative isolate flex min-h-[80svh] items-end overflow-hidden lg:min-h-[88vh]">
        <m.div className="absolute inset-x-0 -top-[10%] -z-10 h-[120%]" style={{ y }}>
          <Img id="boats-jetty" sizes="100vw" className="size-full object-cover object-[70%_60%] md:object-center" />
        </m.div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal/85 via-charcoal/25 to-charcoal/10" />
        <div className="container-site pt-40 pb-16 lg:pb-24">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5 flex items-center gap-4 text-sand">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              Boating experience · Shivsagar Lake
            </p>
            <h2 id="boating-title" className="text-[2.75rem] leading-[1.02] text-offwhite sm:text-6xl lg:text-7xl">
              Let the Lake Take You <span className="italic text-sand">Somewhere</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-offwhite/85 sm:text-lg">
              Bamnoli sits right on the Shivsagar backwaters. Boats set out from the village shore — for an unhurried ride on the
              lake, or as the first leg of the journey to Vasota.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="container-site py-16 lg:py-24">
        <m.ul
          className="grid gap-10 border-b border-forest-deep/10 pb-14 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          variants={stagger(0.1)}
        >
          {features.map(({ icon: Icon, title, text }, i) => (
            <m.li key={title} variants={fadeUp} className="flex gap-5">
              <span className="font-serif text-lg text-earth-dark">0{i + 1}</span>
              <div>
                <Icon className="size-6 text-forest" strokeWidth={1.3} aria-hidden="true" />
                <h3 className="mt-4 text-2xl text-forest-deep">{title}</h3>
                <p className="mt-2 text-charcoal/70">{text}</p>
              </div>
            </m.li>
          ))}
        </m.ul>
        <Reveal className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <p className="max-w-xl text-sm leading-relaxed text-charcoal/65">
            Boat timings, fares and permissions are set locally and change with the season and water levels. Please confirm
            before you travel.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" className="btn btn-primary" onClick={() => openPlanner({ services: ['boating', 'food'] })}>
              Plan a Boat Trip
            </button>
            <a href={whatsappUrl(boatMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <WhatsAppIcon className="size-4" /> WhatsApp Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
