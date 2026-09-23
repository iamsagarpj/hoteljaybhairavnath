import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import Img from './ui/Img.jsx'
import Reveal, { ImageReveal } from './ui/Reveal.jsx'

function CountUp({ to, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(to)

  useEffect(() => {
    if (!inView || reduce) return
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 37, prefix: '~', suffix: ' km', label: 'from Satara via the Kaas road' },
  { value: 15, prefix: '~', suffix: ' km', label: 'from the Kaas Plateau' },
  { value: 1, prefix: '', suffix: ' boat ride', label: 'to the Vasota trail' },
]

const pillars = [
  ['Bamnoli', 'Satara'],
  ['Lake', 'Experience'],
  ['Vasota', 'Adventure'],
]

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-6">
          <ImageReveal className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Img id="lake-island" sizes="(min-width: 1024px) 45vw, 100vw" className="size-full object-cover" />
          </ImageReveal>
          <Reveal delay={0.3} className="absolute -right-2 -bottom-8 hidden w-44 border-8 border-offwhite sm:block lg:-right-10 lg:w-56">
            <Img id="boats-shore" sizes="224px" className="aspect-square w-full object-cover" />
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-4 text-earth-dark">
              <span aria-hidden="true" className="h-px w-8 bg-earth" />
              Arrive
            </p>
            <h2 id="about-title" className="text-[2.5rem] leading-[1.05] text-forest-deep sm:text-5xl lg:text-[3.75rem]">
              Your Basecamp in Bamnoli
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-charcoal/80">
            <p>
              Bamnoli is a small village on the Shivsagar backwaters, where the Koyna reservoir meets forested Sahyadri ridges.
              It’s the starting point for boat journeys across the lake and the trek to Vasota Fort.
            </p>
            <p>
              Hotel Jai Bhairavnath is a convenient base for all of it — a place to rest, eat well and plan your days on the
              water, in the forest, and out to Kaas and the waterfalls nearby.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 grid grid-cols-3 border-y border-forest-deep/10">
            {pillars.map(([a, b], i) => (
              <div key={a} className={`py-6 ${i > 0 ? 'border-l border-forest-deep/10 pl-4 sm:pl-6' : 'pr-4'}`}>
                <p className="font-serif text-xl leading-tight text-forest-deep sm:text-2xl">{a}</p>
                <p className="eyebrow mt-1 text-[0.65rem] text-earth-dark">{b}</p>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-8 grid gap-6 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-sm text-charcoal/65">{s.label}</dt>
                  <dd className="font-serif text-3xl text-forest-deep">
                    <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
