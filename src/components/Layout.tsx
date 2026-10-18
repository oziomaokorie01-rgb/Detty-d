import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Home, LayoutDashboard, Wallet, UtensilsCrossed, Ticket, Mail } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/dashboard', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/budget', label: 'Budget', Icon: Wallet },
  { to: '/food', label: 'Food', Icon: UtensilsCrossed },
  { to: '/events', label: 'Events', Icon: Ticket },
]

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background pb-24">
      {/* Floating orbs — ambient background animation */}
      <div className="orb-container fixed inset-0 z-0">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
        <div className="orb orb-5" />
      </div>

      <div className="mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-full bg-primary" />
            <span className="text-sm font-semibold tracking-wide text-text">
              December Command Center
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="mailto:hello@december.commandcenter.com"
              className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-2.5 py-1 text-xs font-medium text-gray-300 transition hover:text-primary"
            >
              <Mail size={13} />
              <span className="hidden sm:inline">hello@commandcenter.com</span>
            </a>
          </div>
        </header>

        {children}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-300 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${
                  isActive ? 'text-primary' : 'text-gray-400'
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
  );
}
