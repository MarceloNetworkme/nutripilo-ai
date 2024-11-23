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
  v2: `I'm sharing a photo of my meal. This is for lunch.

Can you analyze this meal and provide the recipe in the specified JSON format?
IMPORTANT: You must ALWAYS respond in this JSON format otherwise I'll lose my job so please make sure it is really in JSON format.`
};

//To include in some place for user to know the guidelines!!
export const photoGuidelines = {
  v1: `
PHOTO GUIDELINES FOR BEST RECIPE ANALYSIS

1. Composition:
   - Center the plate in the frame
   - Include the entire plate/dish
   - Show food from a 45-degree angle or directly above
   - Include size reference (e.g., standard dinner plate, fork)

2. Lighting:
   - Use natural daylight when possible
   - Avoid harsh shadows
   - No flash photography
   - Ensure food is well-lit and clearly visible

3. Focus & Quality:
   - Ensure image is sharp and in focus
   - Minimum resolution: 1024x768 pixels
   - Keep the phone/camera steady
   - Clean lens before taking photo

4. Background & Context:
   - Use a clean, uncluttered background
   - Include garnishes and side items
   - Show any sauces or condiments
   - Place food on a contrasting surface

5. Portion Visibility:
   - Show the depth of food items
   - Include multiple components separately
   - Don't stack or overlay foods
   - Show any layers or internal structure

These guidelines will help our AI provide more accurate recipes and nutritional estimates for your meals.
`};