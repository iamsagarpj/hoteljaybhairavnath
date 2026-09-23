import { useMemo, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { BedDouble, Car, Check, Droplets, Flower2, Leaf, LogOut, Minus, Mountain, Plus, Sailboat, Sunset, UtensilsCrossed } from 'lucide-react'
import SectionHeading from './ui/SectionHeading.jsx'
import Reveal from './ui/Reveal.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { buildItinerary, durations, interestOptions, tripTypes } from '../lib/itinerary.js'
import { tripMessage, whatsappUrl } from '../lib/contact.js'

const EASE = [0.22, 1, 0.36, 1]
const ICONS = {
  arrive: Car,
  stay: BedDouble,
  food: UtensilsCrossed,
  boat: Sailboat,
  trek: Mountain,
  kaas: Flower2,
  waterfall: Droplets,
  sunset: Sunset,
  nature: Leaf,
  depart: LogOut,
}

function ChoiceGroup({ legend, children }) {
  return (
    <fieldset>
      <legend className="eyebrow mb-4 text-earth-dark">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  )
}

export default function TripPlanner() {
  const [tripType, setTripType] = useState('Family')
  const [duration, setDuration] = useState('2days')
  const [interests, setInterests] = useState(['stay', 'food', 'boating', 'vasota'])
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(2)

  const toggle = (id) => setInterests((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]))
  const plan = useMemo(() => buildItinerary({ tripType, duration, interests }), [tripType, duration, interests])
  const durationLabel = durations.find((d) => d.id === duration)?.label

  const href = whatsappUrl(
    tripMessage({
      tripType,
      duration: durationLabel,
      date,
      guests,
      stay: interests.includes('stay'),
      boating: interests.includes('boating'),
      vasota: interests.includes('vasota'),
      food: interests.includes('food'),
      otherInterests: interestOptions.filter((o) => ['kaas', 'waterfalls', 'nature'].includes(o.id) && interests.includes(o.id)).map((o) => o.label),
      itinerary: plan.days,
    }),
  )

  return (
    <section id="plan" aria-labelledby="plan-title" className="section-pad">
      <div className="container-site">
        <SectionHeading
          id="plan-title"
          eyebrow="Trip planner"
          title="Build Your Bamnoli Trip"
          intro="Pick who’s coming, how long you have and what you love. We’ll sketch a plan you can send straight to us on WhatsApp."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="space-y-9 lg:col-span-5">
            <ChoiceGroup legend="Trip type">
              {tripTypes.map((t) => (
                <button key={t} type="button" aria-pressed={tripType === t} onClick={() => setTripType(t)} className={tripType === t ? 'chip-active' : 'chip-idle'}>
                  {t}
                </button>
              ))}
            </ChoiceGroup>

            <ChoiceGroup legend="Duration">
              {durations.map((d) => (
                <button key={d.id} type="button" aria-pressed={duration === d.id} onClick={() => setDuration(d.id)} className={duration === d.id ? 'chip-active' : 'chip-idle'}>
                  {d.label}
                </button>
              ))}
            </ChoiceGroup>

            <ChoiceGroup legend="Interests">
              {interestOptions.map((o) => {
                const on = interests.includes(o.id)
                return (
                  <button key={o.id} type="button" aria-pressed={on} onClick={() => toggle(o.id)} className={on ? 'chip-active' : 'chip-idle'}>
                    <span aria-hidden="true" className={`flex size-4 items-center justify-center border ${on ? 'border-offwhite/60' : 'border-forest-deep/30'}`}>
                      {on && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    {o.label}
                  </button>
                )
              })}
            </ChoiceGroup>

            <div className="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2">
              <label className="block">
                <span className="eyebrow mb-3 block text-earth-dark">Date</span>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full border border-forest-deep/20 bg-white px-3 text-base focus:border-forest-deep focus:outline-none"
                />
              </label>
              <div>
                <span id="planner-guests" className="eyebrow mb-3 block text-earth-dark">
                  Guests
                </span>
                <div role="group" aria-labelledby="planner-guests" className="flex h-12 items-center justify-between border border-forest-deep/20 bg-white">
                  <button type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} className="inline-flex size-12 items-center justify-center disabled:opacity-30" aria-label="Fewer guests">
                    <Minus className="size-4" />
                  </button>
                  <output aria-live="polite" className="text-lg font-semibold tabular-nums">
                    {guests}
                  </output>
                  <button type="button" onClick={() => setGuests((g) => Math.min(60, g + 1))} disabled={guests >= 60} className="inline-flex size-12 items-center justify-center disabled:opacity-30" aria-label="More guests">
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="border border-forest-deep/10 bg-white">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-forest-deep/10 px-6 py-5 sm:px-8">
                <h3 className="text-3xl text-forest-deep">Suggested itinerary</h3>
                <p className="text-sm text-charcoal/70">
                  {tripType} · {durationLabel}
                </p>
              </div>

              <div aria-live="polite" className="px-6 py-8 sm:px-8">
                <AnimatePresence mode="wait" initial={false}>
                  <m.div
                    key={`${duration}-${interests.slice().sort().join()}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`grid gap-10 ${plan.days.length > 1 ? 'md:grid-cols-2' : ''} ${plan.days.length > 2 ? 'xl:grid-cols-3' : ''}`}
                  >
                    {plan.days.map((day) => (
                      <div key={day.label}>
                        <p className="eyebrow text-earth-dark">{day.label}</p>
                        <ol className="mt-5">
                          {day.steps.map((step, i) => {
                            const Icon = ICONS[step.icon] ?? Leaf
                            const last = i === day.steps.length - 1
                            return (
                              <li key={step.title} className="relative flex gap-4 pb-5">
                                {!last && <span aria-hidden="true" className="absolute top-10 bottom-0 left-[1.1rem] w-px bg-forest-deep/15" />}
                                <span className="flex size-9 shrink-0 items-center justify-center bg-sand-light text-forest-deep">
                                  <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
                                </span>
                                <span className="pt-1.5">
                                  <span className="block font-medium text-charcoal">{step.title}</span>
                                  {step.detail && <span className="mt-0.5 block text-sm text-charcoal/70">{step.detail}</span>}
                                </span>
                              </li>
                            )
                          })}
                        </ol>
                      </div>
                    ))}
                  </m.div>
                </AnimatePresence>

                {(plan.tip || plan.warnings.length > 0) && (
                  <div className="mt-4 space-y-2 border-t border-forest-deep/10 pt-6 text-sm text-charcoal/70">
                    {plan.tip && <p>Tip: {plan.tip}</p>}
                    {plan.warnings.map((w) => (
                      <p key={w} className="text-earth-dark">
                        {w}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-forest-deep/10 bg-sand-light/50 px-6 py-6 sm:px-8">
                <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full sm:w-auto">
                  <WhatsAppIcon className="size-4" /> Send This Plan on WhatsApp
                </a>
                <p className="mt-3 text-xs leading-relaxed text-charcoal/70">
                  This is a suggested itinerary, not a confirmed booking. Availability, boat schedules and forest access are
                  confirmed by the hotel.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
