import { CalendarHeart, Phone } from 'lucide-react'
import { WhatsAppIcon } from './ui/Icons.jsx'
import { usePlanner } from '../context/planner.js'
import { hasPhone, simpleMessage, telUrl, whatsappUrl } from '../lib/contact.js'

export default function MobileBottomBar() {
  const { openPlanner } = usePlanner()
  const item = 'flex min-h-16 flex-col items-center justify-center gap-1 text-[0.72rem] font-semibold tracking-[0.08em] uppercase'

  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-forest-deep/10 bg-offwhite/97 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_30px_-12px_rgba(23,59,50,0.25)] backdrop-blur-md md:hidden"
    >
      <a href={whatsappUrl(simpleMessage('a trip to Bamnoli'))} target="_blank" rel="noopener noreferrer" className={`${item} text-forest-deep`}>
        <WhatsAppIcon className="size-5" />
        WhatsApp
      </a>
      <a href={telUrl} className={`${item} border-x border-forest-deep/10 text-forest-deep`} aria-label={hasPhone ? 'Call now' : 'Call — see contact details'}>
        <Phone className="size-5" strokeWidth={1.6} aria-hidden="true" />
        Call Now
      </a>
      <button type="button" onClick={() => openPlanner()} className={`${item} bg-forest-deep text-offwhite`}>
        <CalendarHeart className="size-5" strokeWidth={1.6} aria-hidden="true" />
        Plan Trip
      </button>
    </nav>
  )
}
