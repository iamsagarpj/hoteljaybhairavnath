import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, intro, tone = 'dark', align = 'left', className = '', id }) {
  const light = tone === 'light'
  const centered = align === 'center'
  return (
    <Reveal className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow mb-5 flex items-center gap-4 ${centered ? 'justify-center' : ''} ${light ? 'text-sand' : 'text-earth-dark'}`}>
          <span aria-hidden="true" className={`h-px w-8 ${light ? 'bg-accent' : 'bg-earth'}`} />
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={`text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.75rem] ${light ? 'text-offwhite' : 'text-forest-deep'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-6 text-[1.0625rem] leading-relaxed sm:text-lg ${light ? 'text-offwhite/80' : 'text-charcoal/75'} ${centered ? 'mx-auto' : ''} max-w-2xl`}>
          {intro}
        </p>
      )}
    </Reveal>
  )
}
