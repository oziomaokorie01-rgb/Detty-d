import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Copy, Check } from 'lucide-react'
import { useDecemberStore } from '../store/useDecemberStore'

const CATEGORIES = [
  'Transport',
  'Food and groceries',
  'Gifts',
  'Accommodation',
  'Events and outings',
  'Family contributions',
  'Emergency reserve',
  'Other',
]

const naira = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
})

function formatNaira(value: number) {
  return naira.format(value || 0)
}

export default function Budget() {
  const totalBudget = useDecemberStore((s) => s.totalBudget)
  const expenses = useDecemberStore((s) => s.expenses)
  const setTotalBudget = useDecemberStore((s) => s.setTotalBudget)
  const addExpense = useDecemberStore((s) => s.addExpense)
  const deleteExpense = useDecemberStore((s) => s.deleteExpense)
  const toggleExpenseStatus = useDecemberStore((s) => s.toggleExpenseStatus)
  const updateExpense = useDecemberStore((s) => s.updateExpense)

  const [budgetInput, setBudgetInput] = useState(String(totalBudget || ''))
  const [category, setCategory] = useState(CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [status, setStatus] = useState<'planned' | 'paid'>('planned')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const totalPlanned = expenses
    .filter((e) => e.status === 'planned')
    .reduce((sum, e) => sum + e.amount, 0)
  const totalPaid = expenses
    .filter((e) => e.status === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)
  const remaining = totalBudget - totalPaid
  const overPlanned = totalBudget > 0 && totalPlanned > totalBudget

  function handleSetBudget() {
    const value = Number(budgetInput)
    if (!Number.isFinite(value) || value < 0) return
    setTotalBudget(value)
  }

  async function handleShare() {
    const top3 = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3)
    const lines = [
      '🎄 My December Plan:',
      `Total Budget: ${formatNaira(totalBudget)}`,
      `Planned Spending: ${formatNaira(totalPlanned)}`,
      `Actual Spent: ${formatNaira(totalPaid)}`,
      `Remaining: ${formatNaira(remaining)}`,
    ]
    if (top3.length > 0) {
      lines.push('')
      lines.push('Top expenses:')
      top3.forEach((e) => {
        lines.push(`- ${e.description}: ${formatNaira(e.amount)} (${e.status})`)
      })
    }
    const text = lines.join('\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: still toggle UI so user knows attempt happened
      setCopied(false)
    }
  }

  function handleSubmitExpense(e: React.FormEvent) {
    e.preventDefault()
    const amt = Number(amount)
    if (!description.trim() || !Number.isFinite(amt) || amt <= 0) return
    if (editingId) {
      updateExpense(editingId, { category, description: description.trim(), amount: amt, status })
      setEditingId(null)
    } else {
      addExpense({
        id: crypto.randomUUID(),
        category,
        description: description.trim(),
        amount: amt,
        status,
      })
    }
    setDescription('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setStatus('planned')
  }

  function startEdit(exp: (typeof expenses)[number]) {
    setEditingId(exp.id)
    setCategory(exp.category)
    setDescription(exp.description)
    setAmount(String(exp.amount))
    setStatus(exp.status)
  }

  return (
    <main className="space-y-6 py-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">December Budget</h1>
        <Link to="/" className="text-sm font-medium text-green-600">
          Home
        </Link>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Total December Budget
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="numeric"
            value={budgetInput}
            onChange={(e) => setBudgetInput(e.target.value)}
            placeholder="0"
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSetBudget}
            className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Set
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Current budget: {formatNaira(totalBudget)}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total Budget
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {formatNaira(totalBudget)}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total Planned
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {formatNaira(totalPlanned)}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Total Paid
          </p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {formatNaira(totalPaid)}
          </p>
        </div>
        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            Remaining
          </p>
          <p
            className={`mt-1 text-lg font-bold ${
              remaining < 0 ? 'text-festive-500' : 'text-green-700'
            }`}
          >
            {formatNaira(remaining)}
          </p>
        </div>
      </section>

      {overPlanned && (
        <p className="rounded-2xl border border-festive-500/30 bg-festive-50 px-4 py-3 text-sm text-festive-600">
          Heads up: your planned spending ({formatNaira(totalPlanned)}) exceeds your
          total budget ({formatNaira(totalBudget)}). Consider trimming a few items.
        </p>
      )}

      {/* Share summary */}
      <button
        type="button"
        onClick={handleShare}
        className="flex items-center justify-center gap-2 rounded-xl border-2 border-green-600 bg-white px-4 py-3 text-base font-semibold text-green-700 transition active:scale-[0.98]"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
        {copied ? 'Copied!' : 'Share Summary'}
      </button>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold text-gray-900">
          {editingId ? 'Edit Expense' : 'Add Expense'}
        </h2>
        <form onSubmit={handleSubmitExpense} className="space-y-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Abuja flight ticket"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="number"
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>
            <div className="flex gap-2">
              {(['planned', 'paid'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium capitalize ${
                    status === s
                      ? s === 'paid'
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-festive-500 bg-festive-50 text-festive-600'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white"
            >
              {editingId ? 'Save Changes' : 'Add Expense'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null)
                  setDescription('')
                  setAmount('')
                  setCategory(CATEGORIES[0])
                  setStatus('planned')
                }}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">
          Expenses ({expenses.length})
        </h2>
        {expenses.length === 0 ? (
          <p className="rounded-2xl bg-white p-4 text-sm text-gray-500 shadow-sm">
            No expenses yet. Add your first one above.
          </p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="flex items-start justify-between gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900">
                    {exp.description}
                  </p>
                  <p className="text-xs text-gray-500">{exp.category}</p>
                  <p className="mt-1 text-base font-semibold text-gray-900">
                    {formatNaira(exp.amount)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExpenseStatus(exp.id)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      exp.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-festive-50 text-festive-600'
                    }`}
                  >
                    {exp.status}
                  </button>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(exp)}
                      className="text-xs font-medium text-gray-500"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteExpense(exp.id)}
                      className="text-festive-500"
                      aria-label="Delete expense"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
