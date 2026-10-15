import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ExpenseStatus = 'planned' | 'paid'
export type ExpenseCategory =
  | 'Transport'
  | 'Food and groceries'
  | 'Gifts'
  | 'Accommodation'
  | 'Events and outings'
  | 'Family contributions'
  | 'Emergency reserve'
  | 'Other'

export interface Expense {
  id: string
  category: string
  description: string
  amount: number
  status: ExpenseStatus
}

export interface FoodIngredient {
  id: string
  name: string
  quantity: number
  unit: string
  price: number
  purchased: boolean
}

export interface FoodPlan {
  numberOfPeople: number
  selectedDishes: string[]
  customPrices: Record<string, number>
  purchasedItems: string[]
}

export interface TravelChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface TravelPlan {
  departureCity: string
  destinationCity: string
  departureDate: string
  travellers: number
  transportMode: string
  expectedFare: number
  accommodation: number
  localTransport: number
  checklist: TravelChecklistItem[]
}

export interface DecemberState {
  totalBudget: number
  expenses: Expense[]
  foodPlan: FoodPlan
  travelPlan: TravelPlan
  setTotalBudget: (amount: number) => void
  addExpense: (expense: Expense) => void
  updateExpense: (id: string, patch: Partial<Expense>) => void
  deleteExpense: (id: string) => void
  toggleExpenseStatus: (id: string) => void
  setTravelPlan: (patch: Partial<TravelPlan>) => void
  reset: () => void
  updateFoodPlan: (updates: Partial<FoodPlan>) => void
  togglePurchasedItem: (itemId: string) => void
  resetFoodPlan: () => void
}

const initialFoodPlan: FoodPlan = {
  numberOfPeople: 5,
  selectedDishes: [],
  customPrices: {},
  purchasedItems: [],
}

const initialTravelPlan: TravelPlan = {
  departureCity: '',
  destinationCity: '',
  departureDate: '',
  travellers: 1,
  transportMode: '',
  expectedFare: 0,
  accommodation: 0,
  localTransport: 0,
  checklist: [],
}

const initialState = {
  totalBudget: 0,
  expenses: [] as Expense[],
  foodPlan: initialFoodPlan,
  travelPlan: initialTravelPlan,
}

export const useDecemberStore = create<DecemberState>()(
  persist(
    (set) => ({
      ...initialState,
      setTotalBudget: (amount) => set({ totalBudget: amount }),
      addExpense: (expense) =>
        set((state) => ({ expenses: [...state.expenses, expense] })),
      updateExpense: (id, patch) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      toggleExpenseStatus: (id) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === id
              ? { ...e, status: e.status === 'paid' ? 'planned' : 'paid' }
              : e
          ),
        })),
      updateFoodPlan: (updates) =>
        set((state) => ({ foodPlan: { ...state.foodPlan, ...updates } })),
      togglePurchasedItem: (itemId) =>
        set((state) => {
          const purchased = state.foodPlan.purchasedItems.includes(itemId)
            ? state.foodPlan.purchasedItems.filter((id) => id !== itemId)
            : [...state.foodPlan.purchasedItems, itemId]
          return { foodPlan: { ...state.foodPlan, purchasedItems: purchased } }
        }),
      resetFoodPlan: () => set({ foodPlan: initialFoodPlan }),
      setTravelPlan: (patch) =>
        set((state) => ({ travelPlan: { ...state.travelPlan, ...patch } })),
      reset: () => set(initialState),
    }),
    {
      name: 'december-command-center',
      version: 1,
    }
  )
)
