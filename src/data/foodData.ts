// Illustrative market estimates only — prices must be edited by the user.

export interface Ingredient {
  id: string
  name: string
  unit: string
  baseQtyPer5: number
  basePrice: number
}

export interface Dish {
  key: string
  name: string
  ingredients: Ingredient[]
}

export const DISHES: Dish[] = [
  {
    key: 'jollof-rice',
    name: 'Jollof Rice',
    ingredients: [
      { id: 'jr-rice', name: 'Long-grain rice', unit: 'kg', baseQtyPer5: 2, basePrice: 4500 },
      { id: 'jr-tomato', name: 'Tomatoes & pepper mix', unit: 'cups', baseQtyPer5: 6, basePrice: 3000 },
      { id: 'jr-onion', name: 'Onions', unit: 'bulbs', baseQtyPer5: 4, basePrice: 1500 },
      { id: 'jr-oil', name: 'Vegetable oil', unit: 'cups', baseQtyPer5: 1, basePrice: 2500 },
      { id: 'jr-seasoning', name: 'Seasoning & spices', unit: 'packs', baseQtyPer5: 2, basePrice: 1800 },
    ],
  },
  {
    key: 'fried-rice',
    name: 'Fried Rice',
    ingredients: [
      { id: 'fr-rice', name: 'Long-grain rice', unit: 'kg', baseQtyPer5: 2, basePrice: 4500 },
      { id: 'fr-veg', name: 'Mixed vegetables', unit: 'packs', baseQtyPer5: 2, basePrice: 4000 },
      { id: 'fr-liver', name: 'Chicken liver', unit: 'kg', baseQtyPer5: 0.5, basePrice: 3500 },
      { id: 'fr-oil', name: 'Vegetable oil', unit: 'cups', baseQtyPer5: 1, basePrice: 2500 },
      { id: 'fr-seasoning', name: 'Seasoning & spices', unit: 'packs', baseQtyPer5: 2, basePrice: 1800 },
    ],
  },
  {
    key: 'stew',
    name: 'Tomato Stew',
    ingredients: [
      { id: 'st-tomato', name: 'Tomatoes & pepper', unit: 'cups', baseQtyPer5: 8, basePrice: 4000 },
      { id: 'st-oil', name: 'Palm/vegetable oil', unit: 'cups', baseQtyPer5: 1.5, basePrice: 3000 },
      { id: 'st-onion', name: 'Onions', unit: 'bulbs', baseQtyPer5: 4, basePrice: 1500 },
      { id: 'st-meat', name: 'Beef / goat meat', unit: 'kg', baseQtyPer5: 1, basePrice: 8000 },
      { id: 'st-seasoning', name: 'Seasoning & spices', unit: 'packs', baseQtyPer5: 2, basePrice: 1800 },
    ],
  },
  {
    key: 'salad',
    name: 'Salad',
    ingredients: [
      { id: 'sl-cabbage', name: 'Cabbage', unit: 'heads', baseQtyPer5: 1, basePrice: 1500 },
      { id: 'sl-carrot', name: 'Carrots', unit: 'pieces', baseQtyPer5: 5, basePrice: 1200 },
      { id: 'sl-cucumber', name: 'Cucumber', unit: 'pieces', baseQtyPer5: 3, basePrice: 1500 },
      { id: 'sl-sweetcorn', name: 'Sweet corn', unit: 'tins', baseQtyPer5: 2, basePrice: 3000 },
      { id: 'sl-cream', name: 'Salad cream / mayo', unit: 'bottles', baseQtyPer5: 1, basePrice: 2500 },
    ],
  },
  {
    key: 'chicken',
    name: 'Chicken',
    ingredients: [
      { id: 'ch-chicken', name: 'Whole chicken', unit: 'pieces', baseQtyPer5: 1.5, basePrice: 18000 },
      { id: 'ch-seasoning', name: 'Spices & marinade', unit: 'packs', baseQtyPer5: 1, basePrice: 2000 },
      { id: 'ch-oil', name: 'Frying oil', unit: 'cups', baseQtyPer5: 2, basePrice: 3000 },
    ],
  },
  {
    key: 'drinks',
    name: 'Drinks',
    ingredients: [
      { id: 'dr-soft', name: 'Soft drinks (50cl)', unit: 'bottles', baseQtyPer5: 6, basePrice: 6000 },
      { id: 'dr-water', name: 'Bottled water', unit: 'bags', baseQtyPer5: 1, basePrice: 1200 },
      { id: 'dr-ice', name: 'Ice block', unit: 'bags', baseQtyPer5: 1, basePrice: 800 },
    ],
  },
]
