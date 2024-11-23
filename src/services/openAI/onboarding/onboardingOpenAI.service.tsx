import { useMutation } from "@tanstack/react-query";
import { OpenAIAPI } from "../../../infra/openAI/openAI-infra";
import type { OpenAIResponse } from "../../../infra/openAI/response/content-response.model";
import type { AssistantResponse } from "./models/onboarding-openAI.model";
import { systemOnboardingPrompt } from "./prompts/system.nutrition.prompts";
import type { Message } from "../../../infra/openAI/response/content-request.model";

/*
 This service layer is an technical abstraction of the infra layer, here we can do simple technical routing, mappings, etc...
*/
function useOnboardingOpenAI() {
  const mutation = useMutation({
    mutationFn: async ({ messages }: { messages: Message[] }) => {
      const response: OpenAIResponse = await OpenAIAPI.getCompletion(messages, systemOnboardingPrompt.v2);
      const parsedResponseContent: AssistantResponse = JSON.parse(response.choices[0]?.message.content);
      return parsedResponseContent;
    },
  });
  return mutation;
};

export const OpenAIService = {
  useOnboardingOpenAI
};