/**
 * HOTEL CONFIGURATION — the single place to update contact details.
 *
 * OWNER INPUT REQUIRED:
 * Every empty value below is unverified and deliberately left blank. Fill it
 * in only with details confirmed by the hotel owner. Until the WhatsApp and
 * phone numbers are set, WhatsApp buttons open WhatsApp with the message
 * pre-filled (the visitor picks the contact) and Call buttons scroll to the
 * contact section. See research.md for a public lead that needs confirming.
 */

// Digits only, with country code, no "+" or spaces. Example format: 91XXXXXXXXXX
export const WHATSAPP_NUMBER = 'REPLACE_WITH_VERIFIED_NUMBER'
export const PHONE_NUMBER = 'REPLACE_WITH_VERIFIED_NUMBER'

export const hotel = {
  name: 'Hotel Jai Bhairavnath',
  shortName: 'Jai Bhairavnath',
  tagline: 'Stay. Sail. Explore.',
  location: 'Bamnoli, Satara, Maharashtra',
  locality: 'Bamnoli',
  district: 'Satara',
  region: 'Maharashtra',
  country: 'IN',

  whatsapp: WHATSAPP_NUMBER,
  phone: PHONE_NUMBER,
  email: '', // OWNER INPUT REQUIRED
  address: '', // OWNER INPUT REQUIRED — full postal address with PIN code
  postalCode: '', // OWNER INPUT REQUIRED
  geo: null, // OWNER INPUT REQUIRED — { latitude, longitude } from the verified Google Maps pin

  // Paste the hotel's own Google Maps share link here once confirmed.
  googleMapsUrl: '',
  // Used for search / directions links until googleMapsUrl is set.
  mapsQuery: 'Hotel Jai Bhairavnath, Bamnoli, Satara, Maharashtra',

  instagramUrl: '', // OWNER INPUT REQUIRED — only add the hotel's own verified account
  facebookUrl: '', // OWNER INPUT REQUIRED

  // Production URL, e.g. https://www.example.com — used for canonical URL, Open Graph and schema.
  siteUrl: '',
}

export const seo = {
  title: 'Hotel Jai Bhairavnath Bamnoli | Stay, Boating & Vasota Trek | Satara',
  description:
    'Plan your Bamnoli getaway with Hotel Jai Bhairavnath. Explore comfortable stays, local food, boating on the Shivsagar backwaters and Vasota adventures near Satara, Maharashtra.',
  ogImage: '/og-image.jpg',
}

export const navLinks = [
  { label: 'Stay', href: '#stay' },
  { label: 'Dining', href: '#dining' },
  { label: 'Boating', href: '#boating' },
  { label: 'Vasota Trek', href: '#vasota' },
  { label: 'Experiences', href: '#packages' },
  { label: 'Nearby', href: '#nearby' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

/** Regional facts used in copy. Sources are listed in research.md. */
export const regionFacts = {
  fromSatara: '~37 km',
  fromKaas: '~15 km',
  fromPune: '~140–150 km',
  vasotaBoat: '~1–1.5 hr',
}
