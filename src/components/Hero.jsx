import { useRef } from 'react'
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import Img from './ui/Img.jsx'
import { usePlanner } from '../context/planner.js'

const EASE = [0.22, 1, 0.36, 1]
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
})

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { openPlanner } = usePlanner()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0])

  return (
    <section
      id="top"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[82svh] min-h-[560px] items-end overflow-hidden bg-forest-deep md:h-[90vh] md:min-h-[640px]"
    >
      <m.div className="absolute inset-x-0 -top-[4%] -z-10 h-[112%]" style={{ y: imageY }}>
        <Img id="hero-bamnoli-dusk" priority sizes="100vw" className="size-full object-cover object-[50%_60%]" />
      </m.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal/45 via-charcoal/10 to-charcoal/75" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/40 via-transparent to-transparent" />

      <m.div className="container-site pb-24 sm:pb-28 lg:pb-32" style={{ y: contentY, opacity: contentOpacity }}>
        <m.p {...rise(0.1)} className="eyebrow mb-6 flex items-center gap-4 text-sand max-sm:text-[0.6875rem] max-sm:tracking-[0.2em]">
          <span aria-hidden="true" className="h-px w-10 bg-accent max-sm:hidden" />
          Bamnoli • Satara • Maharashtra
        </m.p>
        <m.h1
          id="hero-title"
          {...rise(0.2)}
          className="max-w-4xl text-[2.75rem] leading-[1.02] text-offwhite sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
        >
          Stay Close to the Lake.
          <span className="block italic text-sand">Adventure Beyond the Ordinary.</span>
        </m.h1>
        <m.p {...rise(0.35)} className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-offwhite/85 sm:text-lg">
          Your Bamnoli base for scenic stays, local flavours, boating and unforgettable Vasota adventures.
        </m.p>
        <m.div {...rise(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" className="btn btn-gold sm:min-w-52" onClick={() => openPlanner()}>
            Plan My Trip
          </button>
          <a href="#vasota" className="btn btn-outline-light sm:min-w-52">
            Explore Vasota
          </a>
        </m.div>
      </m.div>

      <a
        href="#intro"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-offwhite/80 transition-colors hover:text-offwhite sm:flex"
      >
        <span className="eyebrow text-[0.65rem]">Explore</span>
        <m.span
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ArrowDown className="size-4" strokeWidth={1.5} />
        </m.span>
      </a>
    </section>
  )
}
