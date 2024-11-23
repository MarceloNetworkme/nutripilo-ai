import { toast } from "react-toastify";
import { useCallback } from "react";
import { mealGenerationServiceOpenAI } from "../openAI/meal-generation/mealsOpenAI.service";
import { mealsCosmosService } from "../cosmos/meals/meals.service";
import type { Meal } from "../openAI/meal-generation/models/meal-openAI.model";
import type { Message } from "../../infra/openAI/response/content-request.model";
import { generatePrompt, mapMealToMealResponse } from "./meal-generation.mapper";
import type { UserResponse } from "../../infra/cosmos/users/response/user-response.model";

// Custom hook to process OpenAI responses
const useProcessMealOpenAI = () => {
  const { mutateAsync } = mealGenerationServiceOpenAI.useMealGenerationOpenAI();

  return useCallback(async (message: Message) => {
    try {
      const response: Meal[] = await mutateAsync({ message });
      return response;
    } catch (e) {
      toast.error(`Failed to get AI response: ${e}`);
     
      throw e;
    }
  }, [mutateAsync]);
};



const useGenerateMeals = () => {

  const processMealOpenAI = useProcessMealOpenAI();
  const { mutateAsync: mealsMutateAsync } = mealsCosmosService.useCreateMeals();

  return useCallback(
    async (week_day:string, userResponse:UserResponse) => {

      const userMessage: Message = {"content":generatePrompt(userResponse),"role":"user"} 


      try {
        const meals = await processMealOpenAI(userMessage);
        const mealsResponse = meals.map((meal) => mapMealToMealResponse(meal, userResponse.userId, "not_confirmed", week_day));
        await mealsMutateAsync(mealsResponse);
      } catch (error) {
        toast.error("An error occurred while processing your request. Please try again.");
      }
    },
    [mealsMutateAsync, processMealOpenAI]
  );
};

export const mealGenerationService = {
    useGenerateMeals,
};
