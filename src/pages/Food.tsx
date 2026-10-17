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
        <h1 className="text-2xl font-bold text-text">Christmas Food Planner</h1>
        <Link to="/" className="text-sm font-medium text-primary">
          Home
        </Link>
      </header>

      <form onSubmit={handleGenerate} className="space-y-5 rounded-2xl bg-surface p-4 shadow-sm">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Number of people eating
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={people}
            onChange={(e) => setPeople(Number(e.target.value) || 1)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-base focus:border-primary focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Dishes to prepare
          </label>
          <div className="space-y-2">
            {DISHES.map((dish) => (
              <label
                key={dish.key}
                className="flex items-center gap-3 rounded-xl border border-gray-300 px-3 py-2.5"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(dish.key)}
                  onChange={() => toggleDish(dish.key)}
                  className="h-4 w-4 accent-primary"
                />
                <span className="text-sm text-gray-200">{dish.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Target food budget (optional)
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={targetBudget}
            onChange={(e) => setTargetBudget(e.target.value)}
            placeholder="0"
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-base focus:border-primary focus:outline-none"
          />
        </div>

        {error && <p className="text-sm text-secondary">{error}</p>}

        <button
          type="submit"
          className="w-full rounded-xl bg-primary px-4 py-3 text-base font-semibold text-text"
        >
          Generate Shopping List
        </button>
      </form>

      {showList && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm text-secondary">
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
                      className={`flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-sm ${
                        it.purchased ? 'opacity-60' : ''
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={it.purchased}
                        onChange={() =>
                          useDecemberStore.getState().togglePurchasedItem(it.id)
                        }
                        className="h-4 w-4 accent-primary"
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate font-medium text-text ${
                            it.purchased ? 'line-through' : ''
                          }`}
                        >
                          {it.name}
                        </p>
                        <p className="text-xs text-gray-300">
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
                        className="w-24 rounded-xl border border-gray-300 px-2 py-1.5 text-right text-sm focus:border-primary focus:outline-none"
                      />
                    </li>
                  ))}
                </ul>

                <div className="rounded-2xl bg-surface p-4 shadow-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Total Estimated Cost</span>
                    <span className="font-bold text-text">{fmt(total)}</span>
                  </div>
                  <div className="mt-1 flex justify-between text-sm">
                    <span className="text-gray-300">Cost Per Person</span>
                    <span className="font-bold text-text">
                      {fmt(perPerson)}
                    </span>
                  </div>
                  {hasTarget && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-300">
                        <span>
                          {under ? 'Under budget' : 'Over budget'} by{' '}
                          {fmt(Math.abs(target - total))}
                        </span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-300">
                        <div
                          className={`h-full rounded-full ${
                            under ? 'bg-primary' : 'bg-secondary'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <section className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-300">
                    Don't want to go to the market?
                  </h3>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://chowdeck.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border-2 border-primary bg-surface px-4 py-3 text-base font-semibold text-primary"
                    >
                      Order Groceries on Chowdeck
                    </a>
                    <a
                      href="https://glovoapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border-2 border-secondary bg-surface px-4 py-3 text-base font-semibold text-secondary"
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
