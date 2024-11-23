import type { IngredientResponse, MacronutrientsResponse, MealResponse } from "../../infra/cosmos/meals/response/meals-response.model";
import type { UserResponse } from "../../infra/cosmos/users/response/user-response.model";
import type { Ingredient, Macronutrients, Meal } from "../openAI/meal-generation/models/meal-openAI.model";
import { userMealsPrompt } from "../openAI/meal-generation/prompts/meal.prompts";

export function mapMealToMealResponse(
  meal: Meal,
  userId: string,
  status: string,
  day_of_week: string,
): MealResponse {
  return {
    id: "",
    userId,
    status,
    day_of_week,
    type: "generated",
    imgURL:"",
    title: meal.title,
    time_to_prepare: meal.time_to_prepare,
    description: meal.description,
    instructions: meal.instructions,
    mealType: meal.mealType,
    ingredients: mapIngredients(meal.ingredients),
    macronutrients: mapMacronutrients(meal.macronutrients),
  };
}

function mapIngredients(ingredients: Ingredient[]): IngredientResponse[] {
  return ingredients.map((ingredient) => ({
    name: ingredient.name,
    quantity: ingredient.quantity,
  }));
}

function mapMacronutrients(macronutrients: Macronutrients): MacronutrientsResponse {
  return {
    calories: macronutrients.calories,
    protein: macronutrients.protein,
    fat: macronutrients.fat,
    carbs: macronutrients.carbs,
  };
}

export function generatePrompt(user?: UserResponse): string {
  const promptTemplate = userMealsPrompt.v1;

  // Default values if some fields are missing
  const defaultMacros = { calories: 2000, protein: 150, fat: 70, carbs: 250 };
  const macros = user?.macros || defaultMacros;

  return promptTemplate
    .replace("{{calories}}", macros.calories.toString())
    .replace("{{protein}}", macros.protein.toString())
    .replace("{{fat}}", macros.fat.toString())
    .replace("{{carbs}}", macros.carbs.toString())
    .replace("{{dietary_preference}}", user?.dietary_preference || "normal")
    .replace("{{number_of_meals_per_day}}", JSON.stringify(user?.number_of_meals_per_day || ["breakfast", "lunch", "dinner"]));
}
