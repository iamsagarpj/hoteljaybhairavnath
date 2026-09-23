import { hotel } from '../data/hotel.js'

const digits = (value) => String(value ?? '').replace(/\D/g, '')

export const isNumberConfigured = (value) => {
  const d = digits(value)
  return d.length >= 10 && d.length <= 15
}

export const hasWhatsApp = isNumberConfigured(hotel.whatsapp)
export const hasPhone = isNumberConfigured(hotel.phone)

/**
 * Opens a chat with the hotel when the number is configured; otherwise opens
 * WhatsApp with the message ready so the visitor can choose the contact.
 */
export function whatsappUrl(message) {
  const text = encodeURIComponent(message)
  return hasWhatsApp ? `https://wa.me/${digits(hotel.whatsapp)}?text=${text}` : `https://wa.me/?text=${text}`
}

export const telUrl = hasPhone ? `tel:+${digits(hotel.phone)}` : '#contact'

export const displayPhone = hasPhone ? `+${digits(hotel.phone)}` : 'Number to be confirmed'

const mapsQuery = encodeURIComponent(hotel.mapsQuery)
export const mapsSearchUrl = hotel.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&z=13&output=embed`

const yesNo = (v) => (v ? 'Yes' : 'No')

/** The trip enquiry message, filled from the booking panel or trip planner. */
export function tripMessage({
  tripType,
  duration,
  date,
  guests,
  stay,
  boating,
  vasota,
  food,
  otherInterests = [],
  itinerary = [],
} = {}) {
  const lines = [
    `Hello ${hotel.name},`,
    '',
    'I would like to plan a trip to Bamnoli.',
    '',
    `Trip type: ${tripType || '-'}`,
  ]
  if (duration) lines.push(`Duration: ${duration}`)
  lines.push(
    `Date: ${date ? formatDate(date) : '-'}`,
    `Number of guests: ${guests || '-'}`,
    `Stay required: ${yesNo(stay)}`,
    `Boating required: ${yesNo(boating)}`,
    `Vasota trek required: ${yesNo(vasota)}`,
    `Food required: ${yesNo(food)}`,
  )
  if (otherInterests.length) lines.push(`Also interested in: ${otherInterests.join(', ')}`)
  if (itinerary.length) {
    lines.push('', 'Suggested itinerary (from your website):')
    itinerary.forEach((day) => lines.push(`${day.label}: ${day.steps.map((s) => s.title).join(' → ')}`))
  }
  lines.push('', 'Please share availability and current package details.')
  return lines.join('\n')
}

export const simpleMessage = (topic) =>
  `Hello ${hotel.name},\n\nI found you on your website and would like to know more about ${topic}.\n\nPlease share current availability and details.`

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
