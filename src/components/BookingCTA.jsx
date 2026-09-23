import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { BedDouble, Bus, CalendarDays, Check, Footprints, Heart, Minus, Mountain, Plus, Route, Sailboat, Smile, Users, UtensilsCrossed, X } from 'lucide-react'
import { PlannerContext } from '../context/planner.js'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { tripTypes } from '../lib/itinerary.js'
import { formatDate, hasWhatsApp, tripMessage, whatsappUrl } from '../lib/contact.js'

const EASE = [0.22, 1, 0.36, 1]
const SERVICES = [
  { id: 'stay', label: 'Stay', hint: 'A base in Bamnoli', icon: BedDouble },
  { id: 'food', label: 'Food', hint: 'Local home-style meals', icon: UtensilsCrossed },
  { id: 'boating', label: 'Boating', hint: 'Shivsagar backwaters', icon: Sailboat },
  { id: 'vasota', label: 'Vasota trek', hint: 'Boat ride + forest trail', icon: Footprints },
]
const TRIP_ICONS = { Family: Users, Couple: Heart, Friends: Smile, Adventure: Mountain, Group: Bus }

const todayIso = () => {
  const d = new Date()
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)
}

function Panel({ preset, onClose }) {
  const [tripType, setTripType] = useState(preset.tripType ?? 'Family')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState(preset.guests ?? 2)
  const [services, setServices] = useState(preset.services ?? ['stay', 'food'])
  const dialogRef = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const dialog = dialogRef.current
    dialog?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialog) return
      const focusable = dialog.querySelectorAll('button, input, a[href]')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus?.()
    }
  }, [onClose])

  const toggle = (id) => setServices((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  const href = useMemo(
    () =>
      whatsappUrl(
        tripMessage({
          tripType,
          date,
          guests,
          stay: services.includes('stay'),
          boating: services.includes('boating'),
          vasota: services.includes('vasota'),
          food: services.includes('food'),
        }),
      ),
    [tripType, date, guests, services],
  )

  const summary = [
    tripType,
    `${guests} ${guests === 1 ? 'guest' : 'guests'}`,
    date ? formatDate(date) : 'Dates flexible',
  ].join(' · ')

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6">
      <m.div
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="planner-title"
        aria-describedby="planner-desc"
        tabIndex={-1}
        className="relative flex max-h-[92svh] w-full max-w-xl flex-col overflow-hidden bg-offwhite shadow-2xl outline-none sm:rounded-sm"
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="relative shrink-0 bg-forest-deep px-6 pt-7 pb-6 text-offwhite sm:px-8 sm:pt-6 sm:pb-5">
          <span aria-hidden="true" className="absolute top-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-offwhite/30 sm:hidden" />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">Plan my trip</p>
              <h2 id="planner-title" className="mt-2 text-3xl leading-tight sm:text-[2.125rem]">
                Tell us about your trip
              </h2>
              <p id="planner-desc" className="mt-2 max-w-sm text-sm leading-relaxed text-offwhite/75">
                A few taps and we’ll reply on WhatsApp with availability and current prices.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mt-1 -mr-2 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-offwhite/25 text-offwhite transition-colors hover:bg-offwhite hover:text-forest-deep"
              aria-label="Close trip planner"
            >
              <X className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-7 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
              <StepNumber n={1} /> Who’s travelling?
            </legend>
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
              {tripTypes.map((t) => {
                const Icon = TRIP_ICONS[t]
                const on = tripType === t
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTripType(t)}
                    className={`flex min-h-[4.5rem] flex-col items-center justify-center gap-1.5 border px-1 py-3 text-xs font-medium sm:text-sm transition-colors ${
                      on ? 'border-forest-deep bg-forest-deep text-offwhite shadow-sm' : 'border-forest-deep/15 bg-white text-charcoal/85 hover:border-forest-deep/45'
                    }`}
                  >
                    <Icon className={`size-5 ${on ? 'text-accent' : 'text-forest'}`} strokeWidth={1.6} aria-hidden="true" />
                    {t}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2">
            <label className="block">
              <span className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                <StepNumber n={2} /> Arrival date
              </span>
              <span className="relative block">
                <CalendarDays aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-forest" strokeWidth={1.75} />
                <input
                  type="date"
                  min={todayIso()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-12 w-full border border-forest-deep/15 bg-white pr-3 pl-10 text-base text-charcoal transition-colors hover:border-forest-deep/45 focus:border-forest-deep focus:outline-none"
                />
              </span>
            </label>
            <div>
              <span id="guests-label" className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
                <StepNumber n={3} /> Guests
              </span>
              <div className="flex h-12 items-center justify-between border border-forest-deep/15 bg-white px-1" role="group" aria-labelledby="guests-label">
                <button type="button" className="inline-flex size-10 items-center justify-center rounded-full text-forest-deep transition-colors hover:bg-forest-deep/8 disabled:opacity-30" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label="Fewer guests">
                  <Minus className="size-4" />
                </button>
                <output aria-live="polite" className="flex items-baseline gap-1.5 text-lg font-semibold tabular-nums text-charcoal">
                  {guests}
                  <span className="text-xs font-medium text-charcoal/65">{guests === 1 ? 'guest' : 'guests'}</span>
                </output>
                <button type="button" className="inline-flex size-10 items-center justify-center rounded-full text-forest-deep transition-colors hover:bg-forest-deep/8 disabled:opacity-30" onClick={() => setGuests((g) => Math.min(60, g + 1))} disabled={guests >= 60} aria-label="More guests">
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-charcoal">
              <StepNumber n={4} /> I’m interested in
            </legend>
            <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
              {SERVICES.map((s) => {
                const on = services.includes(s.id)
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s.id)}
                    className={`group relative flex items-center gap-3.5 border p-3 pr-10 text-left transition-colors ${
                      on ? 'border-forest-deep bg-forest-deep/[0.06]' : 'border-forest-deep/15 bg-white hover:border-forest-deep/45'
                    }`}
                  >
                    <span className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors ${on ? 'bg-forest-deep text-offwhite' : 'bg-sand-light text-forest'}`}>
                      <Icon className="size-[1.125rem]" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-charcoal">{s.label}</span>
                      <span className="block text-xs leading-snug text-charcoal/70">{s.hint}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute top-3 right-3 flex size-5 items-center justify-center rounded-full border transition-colors ${
                        on ? 'border-forest-deep bg-forest-deep text-offwhite' : 'border-forest-deep/25 text-transparent'
                      }`}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="shrink-0 border-t border-forest-deep/10 bg-sand-light/70 px-6 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
          <p className="mb-3 text-center text-xs font-medium tracking-wide text-charcoal/75">{summary}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            <WhatsAppIcon className="size-[1.125rem]" /> Send on WhatsApp
          </a>
          <p className="mt-2.5 text-center text-xs leading-relaxed text-charcoal/65">
            {hasWhatsApp
              ? 'Opens WhatsApp with your details filled in. We’ll confirm availability and current prices.'
              : 'Opens WhatsApp with your message ready to send. Availability and prices are confirmed by the hotel.'}
          </p>
          <a href="#plan" onClick={onClose} className="mt-1 flex min-h-11 items-center justify-center gap-2 text-sm font-semibold text-forest-deep underline decoration-forest-deep/30 underline-offset-4 hover:decoration-forest-deep">
            <Route className="size-4" strokeWidth={1.75} aria-hidden="true" /> Or build a day-by-day itinerary
          </a>
        </div>
      </m.div>
    </div>
  )
}

function StepNumber({ n }) {
  return (
    <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full bg-forest-deep text-[0.6875rem] font-semibold text-offwhite">
      {n}
    </span>
  )
}

export default function PlannerProvider({ children }) {
  const [state, setState] = useState(null)
  const openPlanner = useCallback((preset = {}) => setState({ preset, key: Date.now() }), [])
  const close = useCallback(() => setState(null), [])
  const value = useMemo(() => ({ openPlanner }), [openPlanner])

  return (
    <PlannerContext.Provider value={value}>
      {children}
      <AnimatePresence>{state && <Panel key={state.key} preset={state.preset} onClose={close} />}</AnimatePresence>
    </PlannerContext.Provider>
  )
}
