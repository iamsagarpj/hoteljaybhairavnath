import { useState } from 'react'
import Img from './ui/Img.jsx'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal, { ImageReveal } from './ui/Reveal.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { menuCategories } from '../data/menu.js'
import { hotel } from '../data/hotel.js'
import { whatsappUrl } from '../lib/contact.js'

const menuMessage = `Hello ${hotel.name},\n\nWhat's on today's menu? I'd also like to know meal timings${'\n'}and whether packed food is available for a trek day.\n\nThank you!`

function Menu() {
  const withDishes = menuCategories.filter((c) => c.dishes.length)
  const [active, setActive] = useState(withDishes[0]?.id)
  const current = withDishes.find((c) => c.id === active)

  if (!withDishes.length) {
    return (
      <div className="mt-8">
        <p className="text-sm font-semibold text-charcoal">Ask us about</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {menuCategories.map((c) => (
            <li key={c.id} className="border border-forest-deep/15 bg-white/60 px-4 py-2 text-sm text-charcoal/80">
              {c.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5">
        {withDishes.map((c) => (
          <button
            key={c.id}
            role="tab"
            type="button"
            id={`tab-${c.id}`}
            aria-selected={active === c.id}
            aria-controls={`panel-${c.id}`}
            onClick={() => setActive(c.id)}
            className={`${active === c.id ? 'chip-active' : 'chip-idle'} shrink-0`}
          >
            {c.label}
          </button>
        ))}
      </div>
      {current && (
        <ul role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`} className="mt-6 divide-y divide-forest-deep/10 border-y border-forest-deep/10">
          {current.dishes.map((d) => (
            <li key={d.name} className="flex items-baseline justify-between gap-4 py-4">
              <span>
                <span className="font-serif text-xl text-forest-deep">{d.name}</span>
                {d.note && <span className="mt-0.5 block text-sm text-charcoal/65">{d.note}</span>}
              </span>
              {typeof d.veg === 'boolean' && (
                <span className={`text-xs font-semibold tracking-wider uppercase ${d.veg ? 'text-forest' : 'text-earth-dark'}`}>{d.veg ? 'Veg' : 'Non-veg'}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function FoodSection() {
  return (
    <section id="dining" aria-labelledby="dining-title" className="section-pad overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:order-2 lg:col-span-7">
          <div className="grid grid-cols-6 grid-rows-[auto_auto] gap-3 sm:gap-4">
            <ImageReveal className="col-span-6 aspect-[16/10] sm:col-span-4 sm:row-span-2 sm:aspect-auto">
              <Img id="food-thali" sizes="(min-width: 1024px) 40vw, (min-width: 640px) 66vw, 100vw" className="size-full object-cover" />
            </ImageReveal>
            <Reveal delay={0.15} className="col-span-3 aspect-square overflow-hidden sm:col-span-2">
              <Img id="food-pithla-bhakri" sizes="(min-width: 1024px) 20vw, 50vw" className="size-full object-cover transition-transform duration-1000 hover:scale-105" />
            </Reveal>
            <Reveal delay={0.25} className="col-span-3 aspect-square overflow-hidden sm:col-span-2">
              <Img id="food-misal" sizes="(min-width: 1024px) 20vw, 50vw" className="size-full object-cover transition-transform duration-1000 hover:scale-105" />
            </Reveal>
          </div>
          <p className="mt-3 text-xs text-charcoal/70">Photos show traditional Maharashtrian dishes for illustration. Ask the hotel for the current menu.</p>
        </div>

        <div className="lg:order-1 lg:col-span-5">
          <SectionHeading
            id="dining-title"
            eyebrow="Taste"
            title={
              <>
                Come Hungry.
                <span className="block italic text-earth-dark">Leave Happy.</span>
              </>
            }
            intro="Enjoy comforting local flavours after a day on the water or in the hills — simple, hearty food that tastes of the Sahyadris."
          />
          <Reveal delay={0.1}>
            <Menu />
            <a href={whatsappUrl(menuMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-9">
              <WhatsAppIcon className="size-4" /> Ask About Today’s Menu
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
