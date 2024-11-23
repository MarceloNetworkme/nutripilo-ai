export interface MealResponse {
  id: string;
  ingredients: IngredientResponse[];
  title: string;
  userId: string;
  type: 'generated' | 'captured';
  imgURL?: string;
  status: string;
  day_of_week: string;
  time_to_prepare: number;
  description: string;
  instructions: string;
  mealType:string;
  macronutrients: MacronutrientsResponse;
}

export interface IngredientResponse {
  name: string;
  quantity: string;
}

export interface MacronutrientsResponse {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}
