/**
 * ROOMS — OWNER INPUT REQUIRED
 *
 * No room details have been verified yet, so this list is intentionally
 * empty and the site shows a general "Ask About Rooms" panel instead.
 *
 * To publish rooms, copy ROOM_TEMPLATE for each room type and fill in only
 * confirmed details. Room images go in public/images/hotel/ and must be
 * real photos of this hotel.
 */
export const ROOM_TEMPLATE = {
  id: 'room-id', // e.g. 'family-room'
  name: '', // e.g. 'Family Room'
  description: '',
  price: null, // number in INR per night, or null to show priceLabel
  priceLabel: 'Ask for current rate',
  occupancy: '', // e.g. 'Up to 4 guests'
  amenities: [], // e.g. ['Attached bathroom', 'Hot water'] — confirmed amenities only
  images: [], // e.g. [{ src: '/images/hotel/family-room.webp', alt: 'Family room with two double beds', width: 1600, height: 1067 }]
  available: true,
}

export const rooms = []
