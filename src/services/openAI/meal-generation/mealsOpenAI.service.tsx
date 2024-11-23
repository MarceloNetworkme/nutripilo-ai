import { useMutation } from "@tanstack/react-query";
import { OpenAIAPI } from "../../../infra/openAI/openAI-infra";
import type { OpenAIResponse } from "../../../infra/openAI/response/content-response.model";
import type { Message } from "../../../infra/openAI/response/content-request.model";
import type { OpenAIMealResponse } from "./models/meal-openAI.model";
import { systemMealsPrompt } from "./prompts/meal.prompts";
import { mapMessagesToImageAnalysis } from "./mapper/image.mapper";
import { systemImageMealsPrompt } from "./prompts/image.meal.prompts";

/*
 This service layer is an technical abstraction of the infra layer, here we can do simple technical routing, mappings, etc...
*/
function useMealGenerationOpenAI() {
  const mutation = useMutation({
    mutationFn: async ({ message }: { message: Message }) => {
      const response: OpenAIResponse = await OpenAIAPI.getCompletion([message], systemMealsPrompt.v1);
      console.log(response.choices[0]?.message.content)
      const parsedResponseContent: OpenAIMealResponse = JSON.parse(response.choices[0]?.message.content);
      console.log("Parsed response content", parsedResponseContent);
      return parsedResponseContent.meals;
    },
  });
  return mutation;
};

function useMealImageGenerationOpenAI() {
  const mutation = useMutation({
    mutationFn: async ({ imageUrl }: { imageUrl: string }) => {
      const response: OpenAIResponse = await OpenAIAPI.getCompletionImage(mapMessagesToImageAnalysis(imageUrl), systemImageMealsPrompt.v1);
      const parsedResponseContent: OpenAIMealResponse = JSON.parse(response.choices[0]?.message.content);
      return parsedResponseContent.meals[0];
    },
  });
  return mutation;
};

export const mealGenerationServiceOpenAI = {
  useMealGenerationOpenAI,
  useMealImageGenerationOpenAI
};