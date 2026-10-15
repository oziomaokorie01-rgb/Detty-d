import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, LayoutDashboard, Wallet, UtensilsCrossed } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/budget', label: 'Budget', Icon: Wallet },
  { to: '/food', label: 'Food', Icon: UtensilsCrossed },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-cream pb-20">
      <div className="mx-auto w-full max-w-md px-5 py-6">
        <header className="mb-6 flex items-center gap-2">
          <span className="inline-block h-8 w-8 rounded-full bg-green" />
          <span className="text-sm font-semibold tracking-wide text-green-700">
            December Command Center
          </span>
        </header>
        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
                  isActive ? 'text-green-700' : 'text-gray-500'
                }`
              }
            >
              <Icon size={20} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
