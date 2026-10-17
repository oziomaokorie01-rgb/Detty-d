import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDecemberStore } from '../store/useDecemberStore'

const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})
function fmt(v: number) {
  return naira.format(v || 0)
}

export default function Dashboard() {
  const totalBudget = useDecemberStore((s) => s.totalBudget)
  const expenses = useDecemberStore((s) => s.expenses)
  const foodPlan = useDecemberStore((s) => s.foodPlan)
  const reset = useDecemberStore((s) => s.reset)
  const [cleared, setCleared] = useState(false)

  const totalPaid = expenses
    .filter((e) => e.status === 'paid')
    .reduce((s, e) => s + e.amount, 0)
  const remaining = totalBudget - totalPaid
  const budgetProgress =
    totalBudget > 0 ? Math.min(100, (totalPaid / totalBudget) * 100) : 0

  const purchasedCount = foodPlan.purchasedItems.length

  const hasBudget = totalBudget > 0 || expenses.length > 0
  const hasFood = foodPlan.selectedDishes.length > 0

  function handleClearData() {
    if (!window.confirm('Clear all locally stored plans? This cannot be undone.')) return
    reset()
    try {
      localStorage.removeItem('december-command-center')
    } catch {
      // ignore
    }
    setCleared(true)
    window.setTimeout(() => setCleared(false), 2500)
  }

  return (
    <main className="space-y-6 py-4">
      <header>
        <h1 className="text-2xl font-bold text-text">My December Plan</h1>
        <p className="text-sm text-gray-300">
          A quick look at where things stand.
        </p>
      </header>

      {/* Budget health */}
      {hasBudget ? (
        <section className="rounded-2xl bg-surface p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-text">
            Budget Health
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Budget</span>
              <span className="font-bold text-text">
                {fmt(totalBudget)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Total Paid</span>
              <span className="font-bold text-text">{fmt(totalPaid)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Remaining</span>
              <span
                className={`font-bold ${
                  remaining < 0 ? 'text-primary' : 'text-secondary'
                }`}
              >
                {fmt(remaining)}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-300">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${budgetProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400">
              {Math.round(budgetProgress)}% of budget actually spent
            </p>
          </div>
          <Link
            to="/budget"
            className="mt-3 block text-center text-sm font-medium text-primary"
          >
            View full budget
          </Link>
        </section>
      ) : (
        <section className="rounded-2xl bg-surface p-4 text-center shadow-sm">
          <p className="mb-3 text-sm text-gray-300">
            You haven't set up a budget yet.
          </p>
          <Link
            to="/budget"
            className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-text"
          >
            Set up budget
          </Link>
        </section>
      )}

      {/* Food progress */}
      {hasFood ? (
        <section className="rounded-2xl bg-surface p-4 shadow-sm">
          <h2 className="mb-2 text-base font-semibold text-text">
            Christmas Meal
          </h2>
          <p className="text-sm text-gray-300">
            {purchasedCount} item
            {purchasedCount === 1 ? '' : 's'} purchased so far
          </p>
          <Link
            to="/food"
            className="mt-3 inline-block rounded-xl border-2 border-primary px-4 py-2 text-sm font-semibold text-primary"
          >
            View/Update Food List
          </Link>
        </section>
      ) : (
        <section className="rounded-2xl bg-surface p-4 text-center shadow-sm">
          <p className="mb-3 text-sm text-gray-300">
            No Christmas meal plan yet.
          </p>
          <Link
            to="/food"
            className="inline-block rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-text"
          >
            Plan your Christmas meal
          </Link>
        </section>
      )}

      <section className="rounded-2xl bg-surface p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-text">
          Privacy & data
        </h2>
        <p className="mb-3 text-sm text-gray-300">
          Your plan is stored only on this device. Clear it at any time.
        </p>
        <button
          type="button"
          onClick={handleClearData}
          className="w-full rounded-xl border-2 border-primary bg-surface px-4 py-3 text-base font-semibold text-primary"
        >
          Clear All My Data
        </button>
        {cleared && (
          <p className="mt-2 text-center text-sm font-medium text-primary">
            Data cleared
          </p>
        )}
      </section>

      <section className="pt-4">
        <Link to="/" className="text-sm font-medium text-primary">
          Back to home
        </Link>
      </section>
    </main>
  )
}
