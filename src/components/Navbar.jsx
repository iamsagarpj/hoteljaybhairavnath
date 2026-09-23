import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { Menu, Phone, X } from 'lucide-react'
import Logo from './Logo.jsx'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { hotel, navLinks } from '../data/hotel.js'
import { simpleMessage, telUrl, whatsappUrl } from '../lib/contact.js'
import { usePlanner } from '../context/planner.js'

const EASE = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openPlanner } = usePlanner()
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const solid = scrolled || open
  const tone = solid ? 'dark' : 'light'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? 'bg-offwhite/95 shadow-[0_1px_0_rgba(23,59,50,0.08),0_8px_30px_-12px_rgba(23,59,50,0.18)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-[4.5rem] items-center justify-between gap-6 lg:h-20">
        <a href="#top" className="-m-1 p-1" aria-label={`${hotel.name} — back to top`} onClick={() => setOpen(false)}>
          <Logo tone={tone} />
        </a>

        <ul className="hidden items-center gap-7 xl:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`inline-flex min-h-11 items-center text-[0.8125rem] font-medium tracking-[0.06em] transition-colors ${
                  solid ? 'text-charcoal/80 hover:text-forest-deep' : 'text-offwhite/90 hover:text-offwhite'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => openPlanner()}
            className={`btn hidden md:inline-flex ${solid ? 'btn-primary' : 'btn-gold'}`}
          >
            Plan Your Trip
          </button>
          <button
            ref={toggleRef}
            type="button"
            className={`-mr-2 inline-flex size-12 items-center justify-center xl:hidden ${solid ? 'text-forest-deep' : 'text-offwhite'}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" strokeWidth={1.5} /> : <Menu className="size-6" strokeWidth={1.5} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto bg-offwhite lg:top-20 xl:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <div className="container-site flex min-h-full flex-col pt-6 pb-32">
              <m.ul
                className="divide-y divide-forest-deep/10 border-y border-forest-deep/10"
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
              >
                {navLinks.map((link) => (
                  <m.li
                    key={link.href}
                    variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } } }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-14 items-center justify-between font-serif text-[1.75rem] text-forest-deep"
                    >
                      {link.label}
                      <span aria-hidden="true" className="text-base text-earth-dark">→</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>
              <div className="mt-8 grid gap-3">
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={() => {
                    setOpen(false)
                    openPlanner()
                  }}
                >
                  Plan My Trip
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <a href={whatsappUrl(simpleMessage('a stay in Bamnoli'))} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                    <WhatsAppIcon className="size-4" /> WhatsApp
                  </a>
                  <a href={telUrl} onClick={() => setOpen(false)} className="btn btn-outline">
                    <Phone className="size-4" strokeWidth={1.75} /> Call
                  </a>
                </div>
              </div>
              <p className="eyebrow mt-auto pt-10 text-earth-dark">{hotel.tagline} &nbsp;·&nbsp; Bamnoli • Satara</p>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
