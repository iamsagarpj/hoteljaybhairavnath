import { lazy, Suspense, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Camera, Expand } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { LogoMark } from './Logo.jsx'
import { gallery, galleryFilters } from '../data/gallery.js'

const Lightbox = lazy(() => import('./Lightbox.jsx'))
const EASE = [0.22, 1, 0.36, 1]

function ComingSoonTile() {
  return (
    <div className="flex aspect-[4/5] flex-col items-center justify-center gap-4 bg-forest-deep p-8 text-center">
      <LogoMark className="h-14 w-auto text-sand/70" />
      <p className="font-serif text-2xl text-offwhite">Hotel photos coming soon</p>
      <p className="flex items-center gap-2 text-xs text-sand/75">
        <Camera className="size-3.5" aria-hidden="true" /> Real photos of the hotel will appear here
      </p>
    </div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [index, setIndex] = useState(null)
  const key = filter.toLowerCase()
  const items = gallery.filter((g) => key === 'all' || g.category === key)
  const showHotelPlaceholder = (key === 'hotel' || key === 'all') && !gallery.some((g) => g.category === 'hotel')

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="gallery-title" eyebrow="Gallery" title="Moments from Bamnoli" intro="The lake, the forest, the food and the hills around." />
          <Reveal delay={0.1}>
            <div role="group" aria-label="Filter gallery" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
              {galleryFilters.map((f) => (
                <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={`${filter === f ? 'chip-active' : 'chip-idle'} shrink-0`}>
                  {f}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <p className="sr-only" aria-live="polite">
          {items.length} photos shown
        </p>
        <div className="mt-12 columns-2 gap-3 sm:gap-4 lg:columns-3 2xl:columns-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {showHotelPlaceholder && (
              <m.div key="hotel-placeholder" className="mb-3 break-inside-avoid sm:mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ComingSoonTile />
              </m.div>
            )}
            {items.map((item, i) => (
              <m.figure
                key={item.id}
                className="mb-3 break-inside-avoid sm:mb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="group relative block w-full overflow-hidden"
                  aria-label={`Open photo: ${item.caption}`}
                >
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, 50vw"
                    width={item.width}
                    height={item.height}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    style={{ backgroundColor: item.color }}
                    className="w-full transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.04]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-charcoal/0 transition-colors duration-500 group-hover:bg-charcoal/25" />
                  <Expand aria-hidden="true" className="absolute top-3 right-3 size-8 bg-offwhite/90 p-2 text-forest-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </button>
                <figcaption className="mt-2 text-xs text-charcoal/65">{item.caption}</figcaption>
              </m.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{index !== null && <Lightbox items={items} index={index} onChange={setIndex} onClose={() => setIndex(null)} />}</AnimatePresence>
      </Suspense>
    </section>
  )
}
