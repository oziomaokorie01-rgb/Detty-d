export interface Event {
  id: string
  name: string
  date: string
  venue: string
  city: 'Lagos' | 'Abuja' | 'PH'
  priceRange: string
  description: string
  ticketUrl: string
}

export const eventsData: Event[] = [
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
  },
  {
    id: 'evt-3',
    name: 'Affirm Christmas Concert',
    date: '12 Dec 2026',
    venue: 'Eko Convention Centre',
    city: 'Lagos',
    priceRange: '₦15,000 – ₦60,000',
    description:
      'Anight of gospel and inspirational music led by top Nigerian worship artists. A powerful, family-friendly gathering to celebrate the birth of Christ.',
    ticketUrl: 'https://ticketbox.com/events/affirm-christmas-concert-2026',
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
  },
]
