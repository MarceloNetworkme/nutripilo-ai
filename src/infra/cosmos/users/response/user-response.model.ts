export type DietaryPreference = 
  "carnivore" |
  "omnivore" |
  "vegetarian" |
  "vegan" |
  "pescatarian" |
  "gluten-free" |
  "dairy-free" |
  "no-preference" |
  "paelo" |
  "keto" |
  null;

export interface UserResponse {
  id: string;
  userId: string;
  name: string | null;
  gender: string | null;
  dietary_preference: DietaryPreference;
  goal: "weight_loss" | "muscle_gain" | "mantain_weight" | null;
  age: number | null;
  height: number | null;  // in cm
  weight: number | null;  // in kg
  number_of_meals_per_day: string[] | null;
  macros: {
    calories: number;
    protein: number;  // in grams
    fat: number;      // in grams
    carbs: number;    // in grams
  } | null;
}