import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Check, Minus, Plus, X } from 'lucide-react'
import { PlannerContext } from '../context/planner.js'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { tripTypes } from '../lib/itinerary.js'
import { hasWhatsApp, tripMessage, whatsappUrl } from '../lib/contact.js'

const EASE = [0.22, 1, 0.36, 1]
const SERVICES = [
  { id: 'stay', label: 'Stay' },
  { id: 'food', label: 'Food' },
  { id: 'boating', label: 'Boating' },
  { id: 'vasota', label: 'Vasota trek' },
]

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
    dialog?.querySelector('button, input, a')?.focus()
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
        className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto bg-offwhite pb-[env(safe-area-inset-bottom)] shadow-2xl"
        initial={{ y: '100%', opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-forest-deep/10 px-6 pt-6 pb-5 sm:px-8">
          <div>
            <p className="eyebrow text-earth-dark">Plan my trip</p>
            <h2 id="planner-title" className="mt-2 text-3xl text-forest-deep">
              Tell us about your trip
            </h2>
          </div>
          <button type="button" onClick={onClose} className="-mr-3 inline-flex size-12 shrink-0 items-center justify-center text-forest-deep" aria-label="Close trip planner">
            <X className="size-6" strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-7 px-6 py-6 sm:px-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-charcoal">Who’s travelling?</legend>
            <div className="flex flex-wrap gap-2">
              {tripTypes.map((t) => (
                <button key={t} type="button" aria-pressed={tripType === t} onClick={() => setTripType(t)} className={tripType === t ? 'chip-active' : 'chip-idle'}>
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-charcoal">Arrival date</span>
              <input
                type="date"
                min={todayIso()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-12 w-full border border-forest-deep/20 bg-white px-3 text-base text-charcoal focus:border-forest-deep focus:outline-none"
              />
            </label>
            <div>
              <span id="guests-label" className="mb-2 block text-sm font-semibold text-charcoal">
                Guests
              </span>
              <div className="flex h-12 items-center justify-between border border-forest-deep/20 bg-white" role="group" aria-labelledby="guests-label">
                <button type="button" className="inline-flex size-12 items-center justify-center text-forest-deep disabled:opacity-30" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label="Fewer guests">
                  <Minus className="size-4" />
                </button>
                <output aria-live="polite" className="text-lg font-semibold tabular-nums">
                  {guests}
                </output>
                <button type="button" className="inline-flex size-12 items-center justify-center text-forest-deep disabled:opacity-30" onClick={() => setGuests((g) => Math.min(60, g + 1))} disabled={guests >= 60} aria-label="More guests">
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-charcoal">I’m interested in</legend>
            <div className="grid grid-cols-2 gap-2">
              {SERVICES.map((s) => {
                const on = services.includes(s.id)
                return (
                  <button key={s.id} type="button" aria-pressed={on} onClick={() => toggle(s.id)} className={`${on ? 'chip-active' : 'chip-idle'} justify-between`}>
                    {s.label}
                    <span aria-hidden="true" className={`flex size-5 items-center justify-center border ${on ? 'border-offwhite/50' : 'border-forest-deep/25'}`}>
                      {on && <Check className="size-3.5" strokeWidth={2.5} />}
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>
        </div>

        <div className="border-t border-forest-deep/10 bg-sand-light/60 px-6 py-6 sm:px-8">
          <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">
            <WhatsAppIcon className="size-4" /> Send on WhatsApp
          </a>
          <p className="mt-3 text-center text-xs leading-relaxed text-charcoal/65">
            {hasWhatsApp
              ? 'Opens WhatsApp with your details filled in. We’ll confirm availability and current prices.'
              : 'Opens WhatsApp with your message ready to send. Availability and prices are confirmed by the hotel.'}
          </p>
          <a href="#plan" onClick={onClose} className="mt-4 flex min-h-11 items-center justify-center text-sm font-semibold text-forest-deep underline decoration-forest-deep/30 underline-offset-4 hover:decoration-forest-deep">
            Or build a day-by-day itinerary
          </a>
        </div>
      </m.div>
    </div>
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
