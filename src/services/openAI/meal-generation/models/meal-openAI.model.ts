
export interface OpenAIMealResponse {
    meals: Meal[];
}


export interface Meal {
    ingredients: Ingredient[];
    title: string;
    time_to_prepare: number;
    description: string;
    instructions: string;
    mealType:string;
    macronutrients: Macronutrients;
}

export interface Ingredient {
    name: string;
    quantity: string;
}

export interface Macronutrients {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
}
