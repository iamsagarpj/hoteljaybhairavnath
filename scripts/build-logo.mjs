/**
 * Generates the Hotel Jai Bhairavnath logo files with the wordmark converted
 * to outlines, so the SVGs render identically everywhere (print, signage,
 * social profiles) without needing the Cormorant Garamond font installed.
 *
 * Usage: node scripts/build-logo.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import opentype from 'opentype.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fontDir = path.join(root, 'node_modules/@fontsource/cormorant-garamond/files')
const outDir = path.join(root, 'src/assets/logo')
fs.mkdirSync(outDir, { recursive: true })

const load = (weight) =>
  opentype.parse(
    new Uint8Array(fs.readFileSync(path.join(fontDir, `cormorant-garamond-latin-${weight}-normal.woff`))).buffer,
  )
const serif = load(600)
const serifBold = load(700)

const COLORS = {
  forest: '#173B32',
  earth: '#8B6B45',
  sand: '#E8D8BE',
  offWhite: '#F8F6F1',
  accent: '#C69252',
}

/* Emblem: a Maratha fort-gate / temple arch framing the Sahyadri peaks
   (the higher peak nods to Vasota) above the Shivsagar waters, crowned by
   a bindu that recalls a temple kalash. viewBox 0 0 64 80. */
const MARK = {
  arch: 'M9 76V37C9 24.5 19 14.5 32 4C45 14.5 55 24.5 55 37V76Z',
  mountains: 'M15.5 52L25 38.5L29.5 44L37 32.5L48.5 52',
  wave1: 'M15.5 60q4.125 -3 8.25 0t8.25 0t8.25 0t8.25 0',
  wave2: 'M21 66.5q2.75 -2 5.5 0t5.5 0t5.5 0t5.5 0',
  bindu: { cx: 32, cy: 21, r: 2.3 },
}

function textPath(font, text, size, tracking, x, baseline, align = 'left') {
  const scale = size / font.unitsPerEm
  const glyphs = font.stringToGlyphs(text)
  const track = tracking * size
  const advance = glyphs.reduce((sum, g) => sum + g.advanceWidth * scale + track, 0) - track
  let cursor = align === 'center' ? x - advance / 2 : x
  const parts = []
  for (const g of glyphs) {
    parts.push(g.getPath(cursor, baseline, size).toPathData(size > 40 ? 1 : 2))
    cursor += g.advanceWidth * scale + track
  }
  return { d: parts.join(''), width: advance }
}

function markSvg({ stroke, bindu, x = 0, y = 0, scale = 1 }) {
  const sw = (w) => (w / 1).toFixed(2)
  return `<g transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="${stroke}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${MARK.arch}" stroke-width="${sw(2.4)}"/>
    <path d="${MARK.mountains}" stroke-width="${sw(2.2)}"/>
    <path d="${MARK.wave1}" stroke-width="${sw(2)}"/>
    <path d="${MARK.wave2}" stroke-width="${sw(2)}"/>
    <circle cx="${MARK.bindu.cx}" cy="${MARK.bindu.cy}" r="${MARK.bindu.r}" fill="${bindu}" stroke="none"/>
  </g>`
}

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(1)} ${h}" width="${Math.round(w)}" height="${h}" role="img" aria-labelledby="t">
  <title id="t">${title}</title>
  ${body}
</svg>
`

/* Horizontal lockup */
const TEXT_X = 80
const name = textPath(serif, 'JAI BHAIRAVNATH', 31, 0.06, TEXT_X, 44)
const sub = textPath(serifBold, 'HOTEL  ·  BAMNOLI  ·  SATARA', 10.5, 0.34, TEXT_X + 1, 63)
const lockupWidth = TEXT_X + Math.max(name.width, sub.width) + 2

function lockup({ mark, bindu, text, subText }) {
  return svg(
    lockupWidth,
    80,
    `${markSvg({ stroke: mark, bindu })}
  <path d="${name.d}" fill="${text}"/>
  <path d="${sub.d}" fill="${subText}"/>`,
    'Hotel Jai Bhairavnath — Bamnoli, Satara',
  )
}

fs.writeFileSync(
  path.join(outDir, 'logo-primary.svg'),
  lockup({ mark: COLORS.forest, bindu: COLORS.accent, text: COLORS.forest, subText: COLORS.earth }),
)
fs.writeFileSync(
  path.join(outDir, 'logo-light.svg'),
  lockup({ mark: COLORS.sand, bindu: COLORS.accent, text: COLORS.offWhite, subText: COLORS.sand }),
)

/* Emblem only */
fs.writeFileSync(
  path.join(outDir, 'logo-mark.svg'),
  svg(64, 80, markSvg({ stroke: COLORS.forest, bindu: COLORS.accent }), 'Hotel Jai Bhairavnath emblem'),
)

/* Favicon: emblem reversed out of a deep forest tile, tuned to read at 16px */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="${COLORS.forest}"/>
  <g transform="translate(12.8 5.6) scale(0.6)" fill="none" stroke="${COLORS.sand}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${MARK.arch}" stroke-width="4.2"/>
    <path d="${MARK.mountains}" stroke-width="4"/>
    <path d="${MARK.wave1}" stroke-width="3.6"/>
    <circle cx="${MARK.bindu.cx}" cy="${MARK.bindu.cy}" r="3.4" fill="${COLORS.accent}" stroke="none"/>
  </g>
</svg>
`
fs.writeFileSync(path.join(outDir, 'favicon.svg'), favicon)
fs.writeFileSync(path.join(root, 'public/favicon.svg'), favicon)

/* Stacked badge for Instagram / WhatsApp profile pictures and signage */
const S = 1024
const badgeName = textPath(serif, 'JAI BHAIRAVNATH', 74, 0.08, S / 2, 700, 'center')
const badgeSub = textPath(serifBold, 'BAMNOLI  ·  SATARA', 30, 0.42, S / 2, 776, 'center')
const badgeTag = textPath(serif, 'STAY. SAIL. EXPLORE.', 26, 0.3, S / 2, 250, 'center')
fs.writeFileSync(
  path.join(outDir, 'logo-badge.svg'),
  svg(
    S,
    S,
    `<rect width="${S}" height="${S}" fill="${COLORS.forest}"/>
  <circle cx="${S / 2}" cy="${S / 2}" r="${S / 2 - 40}" fill="none" stroke="${COLORS.accent}" stroke-opacity="0.55" stroke-width="2"/>
  <path d="${badgeTag.d}" fill="${COLORS.accent}"/>
  ${markSvg({ stroke: COLORS.sand, bindu: COLORS.accent, x: S / 2 - 32 * 4.2, y: 290, scale: 4.2 }).replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${(w * 0.62).toFixed(2)}"`)}
  <path d="${badgeName.d}" fill="${COLORS.offWhite}"/>
  <path d="${badgeSub.d}" fill="${COLORS.sand}"/>`,
    'Hotel Jai Bhairavnath — Bamnoli, Satara',
  ).replace(/viewBox="0 0 [\d.]+ \d+"/, `viewBox="0 0 ${S} ${S}"`),
)

/* Emblem path data for the inline React logo (inherits currentColor) */
fs.writeFileSync(
  path.join(outDir, 'logoPaths.js'),
  `// Generated by scripts/build-logo.mjs — do not edit by hand.
export const MARK = ${JSON.stringify(MARK, null, 2)}
`,
)

console.log('Logo files written to', path.relative(root, outDir), `(lockup width ${lockupWidth.toFixed(1)})`)
