import { useState } from 'react'
import { Calendar, MapPin, Ticket, ChevronLeft, ChevronRight } from 'lucide-react'
import { eventsData, type Event } from '../data/eventsData'

const CITIES = ['Lagos', 'Abuja', 'PH'] as const

export default function Events() {
  const [activeCity, setActiveCity] = useState<string | null>(null)

  const filtered = activeCity
    ? eventsData.filter((e) => e.city === activeCity)
    : eventsData

  return (
    <main className="flex flex-col gap-6 py-4">
      <header className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary">
          <Calendar size={18} className="text-text" />
        </span>
        <h1 className="text-2xl font-bold text-text">December Events</h1>
      </header>

      {/* Disclaimer banner */}
      <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-center text-sm text-secondary">
        ⚠️ Event details are curated and may change. Always verify before purchasing
        tickets.
      </div>

      {/* City filter */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCity(null)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
            activeCity === null
              ? 'bg-primary text-text'
              : 'bg-surface text-gray-400 hover:text-gray-300'
          }`}
        >
          All
        </button>
        {CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setActiveCity(city)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
              activeCity === city
                ? 'bg-primary text-text'
                : 'bg-surface text-gray-400 hover:text-gray-300'
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Event list */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-surface p-8 text-center text-sm text-gray-400">
          <Ticket size={24} className="mx-auto mb-2 opacity-50" />
          No events found in this city.
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      )}
    </main>
  )
}

function EventCard({ event }: { event: Event }) {
  return (
    <li className="flex flex-col rounded-2xl bg-surface p-4 shadow-sm transition hover:shadow-lg">
      {/* Hero image with horizontal scroll */}
      <div className="relative overflow-hidden rounded-xl">
        <div className="flex gap-2 overflow-x-auto px-2 pb-2">
          {event.images.map((img, i) => (
            <div
              key={i}
              className="shrink-0 w-36 flex-shrink-0 overflow-hidden rounded-lg"
            >
              <img
                src={img}
                alt={`${event.name} — ${event.city} — ${i + 1}`}
                className="h-24 w-full object-cover transition hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        {/* Scroll hint (visible on hover) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
            <ChevronLeft size={20} className="text-white/60" />
            <ChevronRight size={20} className="text-white/60" />
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <h2 className="text-base font-bold text-text">{event.name}</h2>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <Ticket size={12} />
          Get Tickets
        </span>
      </div>

      <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={14} className="shrink-0" />
        {event.date}
      </p>
      <p className="mt-1 flex items-center gap-2 text-sm text-gray-300">
        <MapPin size={14} className="shrink-0" />
        {event.venue}, {event.city}
      </p>

      <p className="mt-2 text-xs font-semibold text-gray-400">{event.priceRange}</p>

      <p className="mt-2 text-sm text-gray-300">{event.description}</p>

      <a
        href={event.ticketUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="primary-btn flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-text transition hover:bg-primary/90 active:scale-[0.98]"
      >
        <Ticket size={16} />
        Get Tickets
      </a>
    </li>
  )
}
