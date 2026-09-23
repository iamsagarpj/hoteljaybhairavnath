export const tripTypes = ['Family', 'Couple', 'Friends', 'Adventure', 'Group']

export const durations = [
  { id: '1day', label: '1 Day' },
  { id: '2days', label: '2 Days' },
  { id: 'weekend', label: 'Weekend' },
]

export const interestOptions = [
  { id: 'stay', label: 'Stay' },
  { id: 'food', label: 'Food' },
  { id: 'boating', label: 'Boating' },
  { id: 'vasota', label: 'Vasota Trek' },
  { id: 'kaas', label: 'Kaas' },
  { id: 'waterfalls', label: 'Waterfalls' },
  { id: 'nature', label: 'Nature' },
]

const tips = {
  Family: 'Keep a relaxed pace — boating and viewpoints suit all ages.',
  Couple: 'Leave time for a quiet sunset by the water.',
  Friends: 'Start early to fit more in — Bamnoli rewards early risers.',
  Adventure: 'For Vasota, plan an early start and carry 2–3 litres of water each.',
  Group: 'Share your group size early so meals and boats can be planned.',
}

const S = {
  arrive: { icon: 'arrive', title: 'Arrive in Bamnoli', detail: 'Via Satara and the Kaas road' },
  arriveEvening: { icon: 'arrive', title: 'Evening arrival in Bamnoli', detail: 'Drive in via Satara and Kaas' },
  checkIn: { icon: 'stay', title: 'Check-in', detail: 'Settle in and freshen up' },
  breakfast: { icon: 'food', title: 'Breakfast' },
  earlyBreakfast: { icon: 'food', title: 'Early breakfast', detail: 'Ask about packed food for the trail' },
  lunch: { icon: 'food', title: 'Lunch', detail: 'Local home-style flavours' },
  lateLunch: { icon: 'food', title: 'Late lunch', detail: 'Refuel after the trek' },
  dinner: { icon: 'food', title: 'Dinner' },
  boating: { icon: 'boat', title: 'Bamnoli boating', detail: 'Out on the Shivsagar backwaters' },
  boatOut: { icon: 'boat', title: 'Boat across the backwaters', detail: 'Towards the Vasota trail start' },
  trek: { icon: 'trek', title: 'Vasota forest trek', detail: 'Subject to forest entry and current rules' },
  boatBack: { icon: 'boat', title: 'Return by boat' },
  kaas: { icon: 'kaas', title: 'Kaas Plateau & Kaas Lake', detail: 'Wildflowers in season (usually Sept–Oct)' },
  waterfalls: { icon: 'waterfall', title: 'Vajrai Waterfall', detail: 'Best in and just after the monsoon' },
  sunset: { icon: 'sunset', title: 'Sunset by the lake' },
  nature: { icon: 'nature', title: 'Slow walk & birdsong', detail: 'Around the Bamnoli shoreline' },
  stay: { icon: 'stay', title: 'Overnight in Bamnoli' },
  depart: { icon: 'depart', title: 'Departure' },
}

export function buildItinerary({ tripType, duration, interests }) {
  const has = (k) => interests.includes(k)
  const food = has('food')
  const vasota = has('vasota')
  const sightseeing = [has('kaas') && S.kaas, has('waterfalls') && S.waterfalls]
  const lakeTime = [has('boating') && S.boating, has('nature') && S.nature, (has('nature') || has('boating')) && S.sunset]
  const vasotaDay = [S.boatOut, S.trek, S.boatBack]
  const warnings = []
  let days

  if (duration === '1day') {
    if (vasota) {
      days = [[S.arrive, ...vasotaDay, food && S.lateLunch, S.depart]]
      if (has('kaas') || has('waterfalls') || has('boating')) {
        warnings.push('Vasota takes most of the day. Add a second day to fit in Kaas, waterfalls or leisure boating.')
      }
    } else {
      days = [[S.arrive, ...sightseeing, food && S.lunch, ...lakeTime, S.depart]]
    }
    if (has('stay')) warnings.push('You selected a stay — a 2-day plan gives you an evening by the lake.')
  } else if (duration === '2days') {
    days = vasota
      ? [
          [S.arrive, ...sightseeing, S.checkIn, food && S.lunch, ...lakeTime, food && S.dinner, S.stay],
          [food ? S.earlyBreakfast : null, ...vasotaDay, food && S.lateLunch, S.depart],
        ]
      : [
          [S.arrive, S.checkIn, food && S.lunch, ...lakeTime, food && S.dinner, S.stay],
          [food && S.breakfast, ...sightseeing, food && S.lunch, S.depart],
        ]
  } else {
    days = [
      [S.arriveEvening, S.checkIn, food && S.dinner, S.stay],
      vasota
        ? [food ? S.earlyBreakfast : null, ...vasotaDay, food && S.lateLunch, has('nature') && S.sunset, food && S.dinner, S.stay]
        : [food && S.breakfast, ...lakeTime, food && S.lunch, ...sightseeing, food && S.dinner, S.stay],
      vasota
        ? [food && S.breakfast, has('boating') && S.boating, ...sightseeing, food && S.lunch, S.depart]
        : [food && S.breakfast, has('nature') && S.nature, food && S.lunch, S.depart],
    ]
  }

  const labels = duration === 'weekend' ? ['Friday', 'Saturday', 'Sunday'] : ['Day 1', 'Day 2']
  return {
    days: days.map((steps, i) => {
      const seen = new Set()
      return {
        label: labels[i],
        steps: steps.filter(Boolean).filter((s) => (seen.has(s.title) ? false : seen.add(s.title))),
      }
    }),
    tip: tips[tripType],
    warnings,
  }
}
