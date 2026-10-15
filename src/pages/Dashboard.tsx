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
        <h1 className="text-2xl font-bold text-green-700">My December Plan</h1>
        <p className="text-sm text-gray-600">
          A quick look at where things stand.
        </p>
      </header>

      {/* Budget health */}
      {hasBudget ? (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-3 text-base font-semibold text-gray-900">
            Budget Health
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Budget</span>
              <span className="font-bold text-gray-900">
                {fmt(totalBudget)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-gray-900">{fmt(totalPaid)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Remaining</span>
              <span
                className={`font-bold ${
                  remaining < 0 ? 'text-festive-500' : 'text-green-700'
                }`}
              >
                {fmt(remaining)}
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-green-600"
                style={{ width: `${budgetProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">
              {Math.round(budgetProgress)}% of budget actually spent
            </p>
          </div>
          <Link
            to="/budget"
            className="mt-3 block text-center text-sm font-medium text-green-600"
          >
            View full budget
          </Link>
        </section>
      ) : (
        <section className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="mb-3 text-sm text-gray-600">
            You haven't set up a budget yet.
          </p>
          <Link
            to="/budget"
            className="inline-block rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Set up budget
          </Link>
        </section>
      )}

      {/* Food progress */}
      {hasFood ? (
        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-base font-semibold text-gray-900">
            Christmas Meal
          </h2>
          <p className="text-sm text-gray-600">
            {purchasedCount} item
            {purchasedCount === 1 ? '' : 's'} purchased so far
          </p>
          <Link
            to="/food"
            className="mt-3 inline-block rounded-xl border-2 border-green-600 px-4 py-2 text-sm font-semibold text-green-700"
          >
            View/Update Food List
          </Link>
        </section>
      ) : (
        <section className="rounded-2xl bg-white p-4 text-center shadow-sm">
          <p className="mb-3 text-sm text-gray-600">
            No Christmas meal plan yet.
          </p>
          <Link
            to="/food"
            className="inline-block rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Plan your Christmas meal
          </Link>
        </section>
      )}

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-2 text-base font-semibold text-gray-900">
          Privacy & data
        </h2>
        <p className="mb-3 text-sm text-gray-600">
          Your plan is stored only on this device. Clear it at any time.
        </p>
        <button
          type="button"
          onClick={handleClearData}
          className="w-full rounded-xl border-2 border-festive-500 bg-white px-4 py-3 text-base font-semibold text-festive-600"
        >
          Clear All My Data
        </button>
        {cleared && (
          <p className="mt-2 text-center text-sm font-medium text-green-600">
            Data cleared
          </p>
        )}
      </section>

      <section className="pt-4">
        <Link to="/" className="text-sm font-medium text-green-600">
          Back to home
        </Link>
      </section>
    </main>
  )
}
