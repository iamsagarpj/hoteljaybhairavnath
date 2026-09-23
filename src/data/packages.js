import { hotel } from './hotel.js'

/**
 * EXPERIENCE PACKAGES
 *
 * These are package *structures* for enquiry, not published offers.
 * Prices are null until the owner confirms them — the card then shows
 * `priceLabel`. `includes` lists what a package can be built around;
 * final inclusions are confirmed on enquiry.
 *
 * To publish a price: set `price` to a number (INR) and `priceNote`, e.g. 'per person'.
 */
const ask = (name) =>
  `Hello ${hotel.name},\n\nI'm interested in the "${name}" package I saw on your website.\n\nDate:\nNumber of guests:\n\nPlease share the current price, what's included and availability.`

export const packageFilters = [
  { id: 'all', label: 'All' },
  { id: 'stay', label: 'Stay' },
  { id: 'lake', label: 'Lake' },
  { id: 'adventure', label: 'Adventure' },
  { id: 'groups', label: 'Groups' },
]

export const packages = [
  {
    id: 'stay-food',
    number: '01',
    title: 'Stay + Food',
    tags: ['stay'],
    description: 'A slow Bamnoli break — a comfortable place to rest and local food at the table.',
    includes: ['Overnight stay', 'Local meals, on request', 'Tips for exploring Bamnoli'],
    idealFor: 'Couples · Families',
    image: 'bamnoli-sunset',
    price: null,
    priceNote: '',
    priceLabel: 'Get Current Price',
    whatsappMessage: ask('Stay + Food'),
  },
  {
    id: 'stay-boating',
    number: '02',
    title: 'Stay + Boating',
    tags: ['stay', 'lake'],
    description: 'Wake up near the backwaters and spend time out on Shivsagar Lake.',
    includes: ['Overnight stay', 'Meals, on request', 'Help planning a boat trip'],
    idealFor: 'Couples · Families · Friends',
    image: 'boats-row',
    price: null,
    priceNote: '',
    priceLabel: 'Get Current Price',
    whatsappMessage: ask('Stay + Boating'),
  },
  {
    id: 'vasota-experience',
    number: '03',
    title: 'Vasota Experience',
    tags: ['adventure', 'lake'],
    description: 'An early start, a boat across the backwaters and a forest trek to Vasota Fort.',
    includes: ['Stay before trek day', 'Early breakfast & food for the trail, on request', 'Guidance on boat & forest-entry requirements'],
    idealFor: 'Trekkers · Friends',
    image: 'vasota-ridge',
    price: null,
    priceNote: '',
    priceLabel: 'Get Current Price',
    whatsappMessage: ask('Vasota Experience'),
  },
  {
    id: 'complete-bamnoli',
    number: '04',
    title: 'Complete Bamnoli Experience',
    tags: ['stay', 'lake', 'adventure'],
    description: 'Stay, eat, sail and trek — with time for Kaas and the waterfalls nearby.',
    includes: ['Stay & meals', 'Boating on Shivsagar', 'Vasota trek day', 'Kaas / Vajrai suggestions by season'],
    idealFor: 'Weekend travellers',
    image: 'backwater-sunset',
    price: null,
    priceNote: '',
    priceLabel: 'Get Current Price',
    whatsappMessage: ask('Complete Bamnoli Experience'),
  },
  {
    id: 'group-family',
    number: '05',
    title: 'Group / Family Package',
    tags: ['groups', 'stay'],
    description: 'For families, friends, clubs and corporate teams — planned around your group.',
    includes: ['Stay for your group', 'Group meals, on request', 'Custom itinerary'],
    idealFor: 'Families · Groups · Corporate',
    image: 'boats-moored',
    price: null,
    priceNote: '',
    priceLabel: 'Get Current Price',
    whatsappMessage: ask('Group / Family'),
  },
]
