import { Message } from "../../../../infra/openAI/response/content-request.model";
import { userImageMealsPrompt } from "../prompts/image.meal.prompts";

export const mapMessagesToImageAnalysis = (imageUrl: string): Message[] => {
  return [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: userImageMealsPrompt.v2,
        },
        {
          type: "image_url",
          image_url: imageUrl
        }
      ]
    }
  ];
};