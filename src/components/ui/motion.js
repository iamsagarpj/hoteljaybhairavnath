export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

export const stagger = (gap = 0.09) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap } },
})
