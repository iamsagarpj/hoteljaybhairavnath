import { m } from 'framer-motion'
import { EASE, fadeUp } from './motion.js'

/** Fades content up once as it scrolls into view. */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const Component = m[as]
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

/** Reveals an image by wiping a cover away. */
export function ImageReveal({ className = '', children }) {
  return (
    <m.div
      className={`relative overflow-hidden ${className}`}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.2, ease: EASE }}
    >
      {children}
    </m.div>
  )
}
