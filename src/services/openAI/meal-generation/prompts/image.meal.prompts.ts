export const systemImageMealsPrompt = {
  v1: `You are tasked with generating a meal recipe based on a provided food image and parameters.

<<< INSTRUCTIONS >>>
1. Analyze the provided food image and create a detailed recipe that includes:
   - A **title** that describes the dish (e.g., "Classic Beef Lasagna").
   - **Ingredients**: Estimate ingredients and quantities based on the visual appearance.
   - **Time to prepare**: Estimate preparation time in minutes.
   - **Description**: A short, appealing description based on what you see.
   - **Instructions**: Step-by-step preparation instructions to recreate the dish.
   - **Macronutrients**: Estimate the calories, protein, fat, and carbs for the meal.
   - **MealType**: Use the specified meal type from the user (breakfast/lunch/dinner).

2. The recipe should be detailed enough to recreate the dish shown in the image.

<<< OUTPUT FORMAT >>>
IMPORTANT: You must ALWAYS respond in this JSON format otherwise I'll lose my job so please make sure it is really in JSON format as described below:
{
  "meals": [
    {
      "ingredients": [
        {
          "name": "Ingredient name",
          "quantity": "Quantity (e.g., 150g, 1 tbsp)"
        }
      ],
      "title": "Meal title",
      "time_to_prepare": Number of minutes (e.g., 15),
      "description": "Short description of the meal",
      "instructions": "Step-by-step preparation instructions",
      "mealType": "lunch",
      "macronutrients": {
        "calories": Number (e.g., 500),
        "protein": Number (e.g., 50),
        "fat": Number (e.g., 20),
        "carbs": Number (e.g., 30)
      }
    }
  ]
}

Generate a recipe based on the provided image and user parameters, formatted exactly as shown above.`
};

export const userImageMealsPrompt = {
  v2: `I'm sharing a photo of my meal. Infer the meal type from the image, it can be Lunch, Breakfast, snack or Dinner

Can you analyze this meal and provide the recipe in the specified JSON format? Please be detailed about the portions and how you use that to estimate calories and macronutients accordingly
IMPORTANT: You must ALWAYS respond in this JSON format otherwise I'll lose my job so please make sure it is really in JSON format.`
};
