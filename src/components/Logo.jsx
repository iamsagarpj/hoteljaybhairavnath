import { MARK } from '../assets/logo/logoPaths.js'

export function LogoMark({ className = 'h-10 w-auto', accent = '#C69252' }) {
  return (
    <svg viewBox="0 0 64 80" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={MARK.arch} strokeWidth="2.6" />
      <path d={MARK.mountains} strokeWidth="2.4" />
      <path d={MARK.wave1} strokeWidth="2.2" />
      <path d={MARK.wave2} strokeWidth="2.2" />
      <circle cx={MARK.bindu.cx} cy={MARK.bindu.cy} r={MARK.bindu.r} fill={accent} stroke="none" />
    </svg>
  )
}

/**
 * Horizontal logo rendered with live text so the header stays light.
 * Standalone outlined files for print/social live in src/assets/logo/.
 */
export default function Logo({ tone = 'dark', size = 'md', className = '' }) {
  const light = tone === 'light'
  const big = size === 'lg'
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className={`${big ? 'h-14' : 'h-10 sm:h-11'} w-auto shrink-0 ${light ? 'text-sand' : 'text-forest-deep'}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif font-semibold tracking-[0.07em] whitespace-nowrap ${big ? 'text-[1.6rem]' : 'text-[1.2rem] sm:text-[1.35rem]'} ${light ? 'text-offwhite' : 'text-forest-deep'}`}
        >
          JAI BHAIRAVNATH
        </span>
        <span
          className={`mt-1.5 font-sans font-semibold tracking-[0.3em] whitespace-nowrap ${big ? 'text-[0.68rem]' : 'text-[0.56rem] sm:text-[0.6rem]'} ${light ? 'text-sand' : 'text-earth-dark'}`}
        >
          HOTEL · BAMNOLI · SATARA
        </span>
      </span>
    </span>
  )
}
