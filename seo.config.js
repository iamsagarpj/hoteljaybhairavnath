import { hotel, seo, PHONE_NUMBER } from './src/data/hotel.js'
import images from './src/data/images.json' with { type: 'json' }

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const digits = (v) => String(v ?? '').replace(/\D/g, '')
/** hotel.siteUrl wins; otherwise Netlify's primary site URL (set during Netlify builds). */
export const siteUrl = (hotel.siteUrl || process.env.URL || '').replace(/\/$/, '')
const abs = (path) => (siteUrl ? new URL(path, siteUrl).href : path)

/** Schema.org data built only from verified fields in hotel.js — empty fields are omitted. */
export function structuredData() {
  const phone = digits(PHONE_NUMBER)
  const sameAs = [hotel.instagramUrl, hotel.facebookUrl].filter(Boolean)
  const lodging = {
    '@type': 'Hotel',
    '@id': siteUrl ? `${siteUrl}/#hotel` : '#hotel',
    name: hotel.name,
    description: seo.description,
    address: {
      '@type': 'PostalAddress',
      ...(hotel.address ? { streetAddress: hotel.address } : {}),
      addressLocality: 'Bamnoli',
      addressRegion: 'Maharashtra',
      ...(hotel.postalCode ? { postalCode: hotel.postalCode } : {}),
      addressCountry: 'IN',
    },
    areaServed: ['Bamnoli', 'Satara district', 'Shivsagar Lake', 'Vasota Fort', 'Kaas Plateau'].map((name) => ({ '@type': 'Place', name })),
    hasMap: hotel.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.mapsQuery)}`,
    ...(siteUrl ? { url: `${siteUrl}/`, image: abs(seo.ogImage) } : {}),
    ...(phone.length >= 10 && phone.length <= 15 ? { telephone: `+${phone}` } : {}),
    ...(hotel.email ? { email: hotel.email } : {}),
    ...(hotel.geo ? { geo: { '@type': 'GeoCoordinates', ...hotel.geo } } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  }
  const attractions = [
    { name: 'Vasota Fort', description: 'Hill fort in the Koyna Wildlife Sanctuary, usually reached by boat from Bamnoli and a forest trek.' },
    { name: 'Shivsagar Lake', description: 'Backwaters of the Koyna reservoir at Bamnoli, Satara.' },
    { name: 'Kaas Plateau', description: 'UNESCO World Natural Heritage site near Satara known for seasonal wildflowers.' },
  ].map((a) => ({ '@type': 'TouristAttraction', ...a, address: { '@type': 'PostalAddress', addressRegion: 'Maharashtra', addressCountry: 'IN' } }))

  return { '@context': 'https://schema.org', '@graph': [lodging, ...attractions] }
}

export function seoHead() {
  const hero = images['hero-bamnoli-dusk']
  const heroSrcSet = hero.widths.map((w) => `/images/hero-bamnoli-dusk-${w}.webp ${w}w`).join(', ')
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    siteUrl && `<link rel="canonical" href="${esc(siteUrl)}/" />`,
    `<meta name="geo.region" content="IN-MH" />`,
    `<meta name="geo.placename" content="Bamnoli, Satara" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:site_name" content="${esc(hotel.name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:image" content="${esc(abs(seo.ogImage))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Boats on Shivsagar Lake at Bamnoli at dusk" />`,
    siteUrl && `<meta property="og:url" content="${esc(siteUrl)}/" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="preload" as="image" type="image/webp" imagesrcset="${heroSrcSet}" imagesizes="100vw" fetchpriority="high" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}
