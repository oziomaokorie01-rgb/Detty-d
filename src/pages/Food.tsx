import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DISHES } from '../data/foodData'
import { useDecemberStore } from '../store/useDecemberStore'

export default function Food() {
  const foodPlan = useDecemberStore((s) => s.foodPlan)
  const updateFoodPlan = useDecemberStore((s) => s.updateFoodPlan)

  const [people, setPeople] = useState(foodPlan.numberOfPeople || 5)
  const [selected, setSelected] = useState<string[]>(foodPlan.selectedDishes)
  const [targetBudget, setTargetBudget] = useState('')
  const [showList, setShowList] = useState(false)
  const [error, setError] = useState('')

  function toggleDish(key: string) {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    )
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (selected.length === 0) {
      setError('Select at least one dish to continue.')
      return
    }
    setError('')
    updateFoodPlan({ numberOfPeople: people, selectedDishes: selected })
    setShowList(true)
  }

  return (
    <main className="space-y-6 py-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-700">Christmas Food Planner</h1>
        <Link to="/" className="text-sm font-medium text-green-600">
          Home
        </Link>
      </header>

      <form onSubmit={handleGenerate} className="space-y-5 rounded-2xl bg-white p-4 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Number of people eating
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value) || 1)}
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Dishes to prepare
          </label>
          <div className="space-y-2">
            {DISHES.map((dish) => (
              <label
                key={dish.key}
                className="flex items-center gap-3 rounded-xl border border-gray-200 px-3 py-2.5"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(dish.key)}
                  onChange={() => toggleDish(dish.key)}
                  className="h-4 w-4 accent-green-600"
                />
                <span className="text-sm text-gray-800">{dish.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Target food budget (optional)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={targetBudget}
            onChange={(e) => setTargetBudget(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-base focus:border-green-600 focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-festive-600">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-green-600 px-4 py-3 text-base font-semibold text-white"
        >
          Generate Shopping List
        </button>
      </form>

      {showList && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-festive-500/30 bg-festive-50 px-4 py-3 text-sm text-festive-600">
            ⚠️ Prices are estimates based on average market rates. Please update them
            to match your local market.
          </div>

          {(() => {
            const naira2 = new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
              maximumFractionDigits: 0,
            })
            const fmt = (v: number) => naira2.format(v || 0)
            const items = foodPlan.selectedDishes.flatMap((key) => {
              const dish = DISHES.find((d) => d.key === key)
              if (!dish) return []
              return dish.ingredients.map((ing) => {
                const factor = foodPlan.numberOfPeople / 5
                const qty = ing.baseQtyPer5 * factor
                const price =
                  foodPlan.customPrices[ing.id] ?? ing.basePrice * factor
                return {
                  id: ing.id,
                  name: ing.name,
                  unit: ing.unit,
                  qty,
                  price,
                  purchased: foodPlan.purchasedItems.includes(ing.id),
                  dish: dish.name,
                }
              })
            })
            const total = items.reduce((s, it) => s + it.price, 0)
            const perPerson =
              foodPlan.numberOfPeople > 0 ? total / foodPlan.numberOfPeople : 0
            const target = Number(targetBudget)
            const hasTarget = Number.isFinite(target) && target > 0
            const progress = hasTarget
              ? Math.min(100, (total / target) * 100)
              : 0
            const under = hasTarget && total <= target

            return (
              <>
                <ul className="space-y-2">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className={`flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm ${
                        it.purchased ? 'opacity-60' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={it.purchased}
                        onChange={() =>
                          useDecemberStore.getState().togglePurchasedItem(it.id)
                        }
                        className="h-4 w-4 accent-green-600"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate font-medium text-gray-900 ${
                            it.purchased ? 'line-through' : ''
                          }`}
                        >
                          {it.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {it.dish} · {Number(it.qty.toFixed(2))} {it.unit}
                        </p>
                      </div>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={Math.round(it.price)}
                        onChange={(e) =>
                          useDecemberStore
                            .getState()
                            .updateFoodPlan({
                              customPrices: {
                                ...foodPlan.customPrices,
                                [it.id]: Number(e.target.value) || 0,
                              },
                            })
                        }
                        className="w-24 rounded-xl border border-gray-200 px-2 py-1.5 text-right text-sm focus:border-green-600 focus:outline-none"
                      />
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total Estimated Cost</span>
                    <span className="font-bold text-gray-900">{fmt(total)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-600">Cost Per Person</span>
                    <span className="font-bold text-gray-900">
                      {fmt(perPerson)}
                    </span>
                  </div>
                  {hasTarget && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>
                          {under ? 'Under budget' : 'Over budget'} by{' '}
                          {fmt(Math.abs(target - total))}
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full ${
                            under ? 'bg-green-600' : 'bg-festive-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <section className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-700">
                    Don't want to go to the market?
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://chowdeck.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border-2 border-green-600 bg-white px-4 py-3 text-base font-semibold text-green-700"
                    >
                      Order Groceries on Chowdeck
                    </a>
                    <a
                      href="https://glovoapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border-2 border-festive-500 bg-white px-4 py-3 text-base font-semibold text-festive-600"
                    >
                      Order on Glovo
                    </a>
                  </div>
                </section>
              </>
            )
          })()}
        </section>
      )}
    </main>
  )
}
