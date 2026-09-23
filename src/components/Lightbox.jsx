import { useEffect, useRef } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1]

export default function Lightbox({ items, index, onChange, onClose }) {
  const item = items[index]
  const closeRef = useRef(null)
  const touchX = useRef(null)
  const prev = () => onChange((index - 1 + items.length) % items.length)
  const next = () => onChange((index + 1) % items.length)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onChange((index - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') onChange((index + 1) % items.length)
      if (e.key === 'Tab') {
        const nodes = [...document.querySelectorAll('[data-lightbox] button, [data-lightbox] a[href]')].filter((n) => n.offsetParent !== null)
        if (!nodes.length) return
        const first = nodes[0]
        const last = nodes[nodes.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onChange, onClose])

  if (!item) return null

  return (
    <m.div
      data-lightbox
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[80] flex flex-col bg-charcoal/97"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) (dx > 0 ? prev : next)()
        touchX.current = null
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 text-offwhite sm:px-6">
        <p className="text-sm text-offwhite/70 tabular-nums">
          {index + 1} / {items.length}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="inline-flex size-12 items-center justify-center" aria-label="Close photo viewer">
          <X className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <m.img
            key={item.id}
            src={item.largest}
            srcSet={item.srcSet}
            sizes="100vw"
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="max-h-full w-auto max-w-full object-contain"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </AnimatePresence>
        <button type="button" onClick={prev} className="absolute left-2 hidden size-12 items-center justify-center bg-offwhite/10 text-offwhite hover:bg-offwhite/20 sm:inline-flex" aria-label="Previous photo">
          <ChevronLeft className="size-6" strokeWidth={1.5} />
        </button>
        <button type="button" onClick={next} className="absolute right-2 hidden size-12 items-center justify-center bg-offwhite/10 text-offwhite hover:bg-offwhite/20 sm:inline-flex" aria-label="Next photo">
          <ChevronRight className="size-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-4 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <div className="min-w-0">
          <p className="font-serif text-xl text-offwhite">{item.caption}</p>
          {item.attribution && (
            <p className="mt-1 truncate text-xs text-offwhite/60">
              Photo:{' '}
              <a href={item.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-offwhite">
                {item.attribution}
              </a>
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2 sm:hidden">
          <button type="button" onClick={prev} className="inline-flex size-12 items-center justify-center bg-offwhite/10 text-offwhite" aria-label="Previous photo">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={next} className="inline-flex size-12 items-center justify-center bg-offwhite/10 text-offwhite" aria-label="Next photo">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </m.div>
  )
}
