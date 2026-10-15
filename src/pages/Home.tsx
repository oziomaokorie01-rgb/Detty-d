import { Link } from 'react-router-dom'
import { Wallet, UtensilsCrossed } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex flex-col gap-8 py-4">
      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-festive-500">
          <span className="h-1.5 w-1.5 rounded-full bg-festive-500" />
          December planning, simplified
        </p>
        <h1 className="text-4xl font-bold leading-tight text-green-700">
          Your December, figured out.
        </h1>
        <p className="text-base leading-relaxed text-gray-600">
          Plan your trips, sort your Christmas shopping, and know where your money is
          going.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <Link
          to="/budget"
          className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-4 text-base font-semibold text-white shadow-sm transition active:scale-[0.98]"
        >
          <Wallet size={18} />
          Plan My December
        </Link>
        <Link
          to="/food"
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-cream-100 px-5 py-4 text-base font-semibold text-green-700 transition active:scale-[0.98]"
        >
          <UtensilsCrossed size={18} />
          Calculate My Christmas Food
        </Link>
      </section>

      <section className="rounded-2xl bg-cream-200 p-4 text-sm text-gray-600">
        <p>
          No account needed. Your plan stays on this device and can be cleared any time.
        </p>
      </section>
    </main>
  )
}
