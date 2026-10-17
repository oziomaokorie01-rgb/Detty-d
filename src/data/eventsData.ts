// -------------------------------------------------------------------
// Event images
// -------------------------------------------------------------------
// Generates an SVG data-URL placeholder with a themed gradient,
// event name, and city. Each event has 3 unique images.

function gradientColors(seed: number) {
  const palette = [
    ['#1a0a2e', '#3b1a5a', '#8b5cf6'],
    ['#1a0a1a', '#3a0a2e', '#8b2bb5'],
    ['#0a0a1a', '#1a0a2e', '#7c3aed'],
    ['#0a1a0a', '#2a1a4a', '#6d28d9'],
    ['#1a0a0a', '#4a0a2e', '#9b30d1'],
    ['#0a0a1a', '#2a1a3a', '#8b5cf6'],
    ['#1a0a1a', '#4a0a2e', '#a855f7'],
    ['#0a0a1a', '#1a0a2e', '#7c3aed'],
  ]
  return palette[seed % palette.length]
}

function svgToDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml;charset=utf-8,${encoded}`
}

export function generateEventImage(name: string, city: string, index: number): string {
  const [c1, c2, c3] = gradientColors(seed(name + index))
  const safeName = name.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 12)
  const safeCity = city.replace(/[^a-z0-9]/gi, '').toLowerCase().slice(0, 8)
  const size = 800

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="g${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c1}" />
      <stop offset="50%" stop-color="${c2}" />
      <stop offset="100%" stop-color="${c3}" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
    </filter>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.12}" fill="url(#g${index})" />
  <rect width="${size}" height="${size}" rx="${size * 0.12}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2" />
  <circle cx="${size * 0.2}" cy="${size * 0.85}" r="${size * 0.35}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="3" />
  <circle cx="${size * 0.2}" cy="${size * 0.85}" r="${size * 0.3}" fill="rgba(255,255,255,0.06)" />
  <text x="${size / 2}" y="${size / 2 + 12}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${size * 0.07}" font-weight="800" fill="rgba(255,255,255,0.9)" letter-spacing="2">
    ${safeName}
  </text>
  <text x="${size / 2}" y="${size / 2 + 40}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${size * 0.04}" font-weight="500" fill="rgba(255,255,255,0.6)" letter-spacing="1">
    ${safeCity}
   </text>
  <rect x="${size * 0.3}" y="${size * 0.55}" width="${size * 0.4}" height="3" rx="1.5" fill="rgba(255,255,255,0.25)" />
  <rect x="${size * 0.3}" y="${size * 0.62}" width="${size * 0.55}" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />
  <rect x="${size * 0.3}" y="${size * 0.69}" width="${size * 0.42}" height="3" rx="1.5" fill="rgba(255,255,255,0.10)" />
</svg>`

  return svgToDataUrl(svg)
}

function seed(s: string): number {
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = ((hash << 5) - hash) + s.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// -------------------------------------------------------------------
// Events data
// -------------------------------------------------------------------
export interface Event {
  id: string
  name: string
  date: string
  venue: string
  city: 'Lagos' | 'Abuja' | 'PH'
  priceRange: string
  description: string
  ticketUrl: string
  images: string[]
}

const EVENTS: Event[] = [
  {
    id: 'evt-1',
    name: 'Rhythm Unplugged',
    date: '20 Dec 2026',
    venue: 'Eko Convention Centre',
    city: 'Lagos',
    priceRange: '₦10,000 – ₦50,000',
    description:
      'A soulful evening of live music featuring Nigeria\'s top Afrobeat and alternative artists. An intimate, stripped-down performance series for the festive season.',
    ticketUrl: 'https://ticketbox.com/events/rhythm-unplugged-2026',
    images: [
      generateEventImage('Rhythm Unplugged', 'Lagos', 1),
      generateEventImage('Rhythm Unplugged', 'Lagos', 2),
      generateEventImage('Rhythm Unplugged', 'Lagos', 3),
    ],
  },
  {
    id: 'evt-2',
    name: 'December to Remember',
    date: '27 Dec 2026',
    venue: 'Africana Event Centre',
    city: 'Abuja',
    priceRange: '₦20,000 – ₦80,000',
    description:
      'A grand Christmas gala with DJ sets, choral performances, and a fireworks display. The definitive end-of-year celebration for the nation\'s capital.',
    ticketUrl: 'https://ticketbox.com/events/december-to-remember-2026',
    images: [
      generateEventImage('December to Remember', 'Abuja', 1),
      generateEventImage('December to Remember', 'Abuja', 2),
      generateEventImage('December to Remember', 'Abuja', 3),
    ],
  },
  {
    id: 'evt-3',
    name: 'Affirm Christmas Concert',
    date: '12 Dec 2026',
    venue: 'Eko Convention Centre',
    city: 'Lagos',
    priceRange: '₦15,000 – ₦60,000',
    description:
      'An night of gospel and inspirational music led by top Nigerian worship artists. A powerful, family-friendly gathering to celebrate the birth of Christ.',
    ticketUrl: 'https://ticketbox.com/events/affirm-christmas-concert-2026',
    images: [
      generateEventImage('Affirm Christmas Concert', 'Lagos', 1),
      generateEventImage('Affirm Christmas Concert', 'Lagos', 2),
      generateEventImage('Affirm Christmas Concert', 'Lagos', 3),
    ],
  },
  {
    id: 'evt-4',
    name: 'Jingle Bell Festival',
    date: '22 Dec 2026',
    venue: 'Shell Hall, Transcorp Hilton',
    city: 'PH',
    priceRange: '₦8,000 – ₦30,000',
    description:
      'Rivers State\'s biggest Christmas party. Live performances, a chocolate-themed market, and family activities across a beautifully lit venue.',
    ticketUrl: 'https://ticketbox.com/events/jingle-bell-festival-2026',
    images: [
      generateEventImage('Jingle Bell Festival', 'PH', 1),
      generateEventImage('Jingle Bell Festival', 'PH', 2),
      generateEventImage('Jingle Bell Festival', 'PH', 3),
    ],
  },
  {
    id: 'evt-5',
    name: 'Auka & Friends Christmas Special',
    date: '15 Dec 2026',
    venue: 'Lan Nigeria Auditorium',
    city: 'Abuja',
    priceRange: '₦5,000 – ₦25,000',
    description:
      'A warm, acoustic holiday concert featuring Nigerian gospel and folk artists. Bring the family for a night of singing, comedy, and celebration.',
    ticketUrl: 'https://ticketbox.com/events/auka-christmas-special-2026',
    images: [
      generateEventImage('Auka & Friends', 'Abuja', 1),
      generateEventImage('Auka & Friends', 'Abuja', 2),
      generateEventImage('Auka & Friends', 'Abuja', 3),
    ],
  },
  {
    id: 'evt-6',
    name: 'Sabarimana Afrobeat Night',
    date: '29 Dec 2026',
    venue: 'Ode On The Lagoon, Lekki',
    city: 'Lagos',
    priceRange: '₦10,000 – ₦35,000',
    description:
      'An all-night Afrobeat dance party with VIP bottle service and a vibrant Yuletide atmosphere. Dress code: festive wear.',
    ticketUrl: 'https://ticketbox.com/events/sabarimana-afrobeat-night-2026',
    images: [
      generateEventImage('Sabarimana Afrobeat', 'Lagos', 1),
      generateEventImage('Sabarimana Afrobeat', 'Lagos', 2),
      generateEventImage('Sabarimana Afrobeat', 'Lagos', 3),
    ],
  },
  {
    id: 'evt-7',
    name: 'Nigerian Idol Season 8 Finale',
    date: '31 Dec 2026',
    venue: 'Eko Hotel Convention Centre',
    city: 'Lagos',
    priceRange: '₦5,000 – ₦20,000',
    description:
      'The much-anticipated season finale with the winning performance, top 10 showcase, and a new year countdown. The biggest TV event of the decade.',
    ticketUrl: 'https://ticketbox.com/events/nigerian-idol-8-finale-2026',
    images: [
      generateEventImage('Nigerian Idol', 'Lagos', 1),
      generateEventImage('Nigerian Idol', 'Lagos', 2),
      generateEventImage('Nigerian Idol', 'Lagos', 3),
    ],
  },
  {
    id: 'evt-8',
    name: 'Nike Centre Christmas Carol Concert',
    date: '18 Dec 2026',
    venue: 'Nike Centre for Art & Culture',
    city: 'Lagos',
    priceRange: '₦3,000 – ₦10,000',
    description:
      'An affordable, family-friendly Christmas concert with timeless carols and a look back at the year\'s highlights. Perfect for a festive evening in.',
    ticketUrl: 'https://ticketbox.com/events/nike-centre-christmas-2026',
    images: [
      generateEventImage('Nike Centre', 'Lagos', 1),
      generateEventImage('Nike Centre', 'Lagos', 2),
      generateEventImage('Nike Centre', 'Lagos', 3),
    ],
  },
]

export const eventsData: Event[] = EVENTS
