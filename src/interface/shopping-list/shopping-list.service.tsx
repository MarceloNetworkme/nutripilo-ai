import type { MealResponse } from "../../infra/cosmos/meals/response/meals-response.model";
import type { ShoppingListItem } from "./shopping-list.model";

export const parseQuantity = (quantityStr: string): { value: number; unit: string; isSpecial: boolean; fullText: string } => {
  // Handle special cases
  if (quantityStr.toLowerCase() === 'to taste') {
    return { value: 0, unit: 'to taste', isSpecial: true, fullText: 'to taste' };
  }

  // Try to match patterns like "1 cup cooked", "2 tablespoons minced", etc.
  const complexMatch = quantityStr.match(/^([\d.]+)\s+(\w+)(?:\s+(.+))?$/);
  if (complexMatch) {
    const [, valueStr, unit, modifier] = complexMatch;
    const fullUnit = modifier ? `${unit} ${modifier}` : unit;
    return {
      value: Number.parseFloat(valueStr),
      unit: fullUnit,
      isSpecial: true,
      fullText: quantityStr
    };
  }

  // Handle simple number+unit cases (like "300g")
  const simpleMatch = quantityStr.match(/^([\d.]+)\s*(\w+)?$/);
  if (simpleMatch) {
    const [, valueStr, unit = ''] = simpleMatch;
    return {
      value: Number.parseFloat(valueStr),
      unit: unit,
      isSpecial: false,
      fullText: quantityStr
    };
  }

  // Return the original string if no pattern matches
  return { value: 0, unit: '', isSpecial: true, fullText: quantityStr };
};

export const generateShoppingList = (meals: MealResponse[]): ShoppingListItem[] => {
  const ingredientMap: Record<string, ShoppingListItem> = {};

  for (const meal of meals.filter(m => m.status !== 'confirmed')) {
    for (const ingredient of meal.ingredients) {
      const { value, unit, isSpecial, fullText } = parseQuantity(ingredient.quantity);
      const key = `${ingredient.name}-${unit}`;

      if (!ingredientMap[key]) {
        ingredientMap[key] = {
          name: ingredient.name,
          quantity: isSpecial ? fullText : `${value}${unit}`,
          meals: [meal.title]
        };
      } else {
        if (!isSpecial) {
          const { value: existingQuantity } = parseQuantity(ingredientMap[key].quantity);
          const newQuantity = existingQuantity + value;
          ingredientMap[key].quantity = `${newQuantity}${unit}`;
        }
        if (!ingredientMap[key].meals.includes(meal.title)) {
          ingredientMap[key].meals.push(meal.title);
        }
      }
    }
  }

  return Object.values(ingredientMap);
};