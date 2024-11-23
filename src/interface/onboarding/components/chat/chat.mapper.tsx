import type { DietaryPreference, UserResponse } from "../../../../infra/cosmos/users/response/user-response.model";
import type { AssistantResponse } from "../../../../services/openAI/onboarding/models/onboarding-openAI.model";


const calculateMacros = (goal: string, weightInKg: number, diet_preference: DietaryPreference, activityMultiplier = 1.5) => {
  // Using the metric formula: M.C = 22 * body weight(kg) * activity multiplier
  let caloryMutiplier: number;
  if (goal === "weight_loss") {
    caloryMutiplier = 16
  } else if (goal === "muscle_gain") {
    caloryMutiplier = 29
  } else {
    //mantain_weight
    caloryMutiplier = 22
  };

  const maintenanceCalories = Math.round(caloryMutiplier * weightInKg * activityMultiplier);

  // Protein: 2g per kg of body weight
  const protein = Math.round(2 * weightInKg);

  // Fat: 25% of total calories (1g fat = 9 calories)
  let fatQuantity = 0.25;
  if (diet_preference === "keto") {
    fatQuantity = 0.7;
  } else if (diet_preference === "paelo"){
    fatQuantity = 0.4;
  }
  const fat = Math.round((maintenanceCalories *fatQuantity) / 9);

  // Remaining calories from carbs (1g carbs = 4 calories)
  const carbCalories = maintenanceCalories - (protein * 4) - (fat * 9);
  const carbs = Math.round(carbCalories / 4);

  return {
    calories: maintenanceCalories,
    protein,  // in grams
    fat,      // in grams
    carbs     // in grams
  };
};

export const mapAssistantResponseToUser = (assistantResponse: AssistantResponse): UserResponse => {
  const { data } = assistantResponse;

  // Calculate macros if weight is available
  const macros = data.weight ? calculateMacros(data.goal, data.weight, data.dietary_preference) : null;
  return {
    id: "",
    userId: Math.random().toString(36).substring(7),
    name: data.name || null,
    gender: data.gender || null,
    dietary_preference: data.dietary_preference || null,
    goal: data.goal || null,
    age: data.age || null,
    height: data.height || null,
    weight: data.weight || null,
    number_of_meals_per_day: data.number_of_meals_per_day || null,
    macros: macros
  };
};

// Example usage:
/*
const assistantResponse = {
  completed: true,
  followUpQuestion: "What are your fitness goals?",
  data: {
    name: "John",
    gender: "male",
    dietary_preference: "vegan",
    goal: "weight_loss",
    age: 25,
    height: 180,
    weight: 75, // 75kg
    number_of_meals_per_day: ["breakfast", "lunch", "dinner"]
  }
};

const user = mapAssistantResponseToUser({
  assistantResponse,
  userId: "user123",
  id: "record456"
});

// For a 75kg person with activity multiplier 1.8, the macros would be approximately:
// calories: 2,970 (22 * 75 * 1.8)
// protein: 150g (2g per kg)
// fat: 82g (25% of calories)
// carbs: 371g (remaining calories)
*/