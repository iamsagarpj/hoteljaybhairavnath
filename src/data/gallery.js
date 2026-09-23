import { getImage } from './images.js'

/**
 * GALLERY
 *
 * Each item references an image id from images.js. `source` and
 * `attribution` are filled from the licence manifest automatically.
 *
 * HOTEL PHOTOS — OWNER INPUT REQUIRED
 * No verified photos of Hotel Jai Bhairavnath were found, so the Hotel
 * category shows "coming soon" tiles. To add real hotel photos, put them in
 * public/images/hotel/ and add entries to `hotelPhotos` like:
 *   { src: '/images/hotel/exterior.webp', alt: 'Front of Hotel Jai Bhairavnath', width: 1600, height: 1067, category: 'hotel', caption: 'Hotel Jai Bhairavnath' }
 */
export const galleryFilters = ['All', 'Hotel', 'Food', 'Boating', 'Vasota', 'Nature', 'Nearby']

export const hotelPhotos = []

const items = [
  ['hero-bamnoli-dusk', 'Boating', 'Dusk on Shivsagar Lake, Bamnoli', 'tall'],
  ['vasota-ridge', 'Vasota', 'Sahyadri cliffs from Vasota Fort', 'wide'],
  ['food-thali', 'Food', 'Maharashtrian thali (illustrative)'],
  ['boats-jetty', 'Boating', 'Boats at the Bamnoli shore'],
  ['kaas-flowers', 'Nearby', 'Wildflowers on Kaas Plateau'],
  ['lake-mesa', 'Nature', 'Shivsagar Lake and its flat-topped ridges'],
  ['vasota-koyna-view', 'Vasota', 'The backwaters from Vasota Fort'],
  ['food-pithla-bhakri', 'Food', 'Pithla bhakri (illustrative)'],
  ['bamnoli-sunset', 'Nature', 'Sunset at Bamnoli', 'tall'],
  ['vajrai', 'Nearby', 'Vajrai Waterfall'],
  ['boats-shore', 'Boating', 'Launch boats at Bamnoli'],
  ['koyna-sanctuary', 'Vasota', 'Koyna Wildlife Sanctuary'],
  ['lake-flooded-trees', 'Nature', 'Trees in the backwaters near Bamnoli'],
  ['food-misal', 'Food', 'Kolhapuri misal pav (illustrative)'],
  ['ghats-viewpoint', 'Nature', 'Western Ghats near Kaas', 'wide'],
  ['vasota-view', 'Vasota', 'Valleys below Vasota Fort'],
  ['kaas-yellow', 'Nearby', 'Kaas Plateau in bloom'],
  ['lake-island', 'Nature', 'An island on Shivsagar Lake'],
  ['sajjangad', 'Nearby', 'Sajjangad gateway'],
  ['food-jhunka-bhakri', 'Food', 'Jhunka bhakri (illustrative)'],
  ['backwater-sunset', 'Nature', 'Koyna backwaters at sunset', 'wide'],
  ['thoseghar', 'Nearby', 'Thoseghar Waterfall'],
  ['boats-moored', 'Boating', 'Boats moored at Bamnoli'],
  ['natural-mirror', 'Nature', 'Still water, late summer'],
  ['mahabaleshwar', 'Nearby', 'Valleys from Mahabaleshwar'],
]

export const gallery = [
  ...hotelPhotos,
  ...items.map(([id, category, caption, shape]) => {
    const image = getImage(id)
    return {
      id,
      src: image.src,
      srcSet: image.srcSet,
      largest: image.largest,
      width: image.width,
      height: image.height,
      color: image.color,
      alt: image.alt,
      category: category.toLowerCase(),
      caption,
      shape,
      source: image.sourceUrl,
      attribution: image.attribution,
    }
  }),
]
