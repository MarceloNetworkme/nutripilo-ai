// From OpenAIResponse only the proper parsed content should be propagated into upper layers. The response content is parsed in the following format:
type DietaryPreference = 
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
export interface AssistantResponse {
  completed: boolean;
  followUpQuestion: string;
  data: NutritionData;
}

export interface NutritionData {
  name: string;
  gender: string;
  dietary_preference: DietaryPreference;
  goal: 'weight_loss' | 'muscle_gain' | "mantain_weight";
  age: number;
  height: number;
  weight: number;
  number_of_meals_per_day: ('breakfast' | 'lunch' | 'dinner')[];
}