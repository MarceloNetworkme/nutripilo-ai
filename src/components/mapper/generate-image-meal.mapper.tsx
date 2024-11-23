import { MealResponse } from "../../infra/cosmos/meals/response/meals-response.model";
import { Meal } from "../../services/openAI/meal-generation/models/meal-openAI.model";

// Maps from OpenAI Meal to MealResponse
export const mapMealToMealResponse = (
  meal: Meal,
  userId: string,
  status: string = 'active',
  dayOfWeek: string = ''
): MealResponse[] => {
  return [{
    id: '', // This will be set by the backend
    userId,
    status,
    day_of_week: dayOfWeek,
    title: meal.title,
    time_to_prepare: meal.time_to_prepare,
    description: meal.description,
    instructions: meal.instructions,
    mealType: meal.mealType,
    ingredients: meal.ingredients.map(ing => ({
      name: ing.name,
      quantity: ing.quantity
    })),
    macronutrients: {
      calories: meal.macronutrients.calories,
      protein: meal.macronutrients.protein,
      fat: meal.macronutrients.fat,
      carbs: meal.macronutrients.carbs
    }
  }];
};