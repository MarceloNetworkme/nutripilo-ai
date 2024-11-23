import { ChatStore } from "./chat.store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { OpenAIService } from "../../../../services/openAI/onboarding/onboardingOpenAI.service";
import type { Message } from "../../../../infra/openAI/response/content-request.model";
import type { AssistantResponse } from "../../../../services/openAI/onboarding/models/onboarding-openAI.model";
import { mapAssistantResponseToUser } from "./chat.mapper";
import { userCosmosService } from "../../../../services/cosmos/users/users.service";
import type { UserResponse } from "../../../../infra/cosmos/users/response/user-response.model";
import { mealGenerationService } from "../../../../services/meal-generation/meal-generation.service";
import { daysOfWeek } from "../../../../utils/const.util";

const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

// Custom hook to process OpenAI responses
const useProcessOpenAI = () => {
  const { mutateAsync } = OpenAIService.useOnboardingOpenAI();

  return useCallback(async (messages: Message[], addMessage: (chat: Message) => void) => {
    try {
      const response: AssistantResponse = await mutateAsync({ messages });
      return response;
    } catch (e) {
      toast.error(`Failed to get AI response: ${e}`);
      const errorMessage: Message = {
        role: "assistant",
        content: "Sorry, I encountered an error processing your request.",
      };
      addMessage(errorMessage);
      throw e;
    }
  }, [mutateAsync]);
};



const useSendMessage = () => {
  const { input, messages, addMessage, setInput } = ChatStore.useChatStore();
  const generateMeals = mealGenerationService.useGenerateMeals();
  const navigate = useNavigate();
  const { mutateAsync: userMutateAsync } = userCosmosService.useCreateUser();
  const processOpenAI = useProcessOpenAI();

  return useCallback(
    async () => {

      const userMessage: Message = { role: "user", content: input };
      addMessage(userMessage);
      setInput("");

      try {
        const assistantResponse: AssistantResponse = await processOpenAI([...messages, userMessage], addMessage);

        if (assistantResponse.completed) {
          toast.success(`Thank you ${assistantResponse.data.name}! We collected all information required. We are redirecting you to the next step.`);
          toast.loading('We are preparing your meals for the week. This may take a few seconds.');

          try {
            const user: UserResponse = mapAssistantResponseToUser(assistantResponse);
            const result: UserResponse = await userMutateAsync(user);
            await generateMeals("sunday",result);
            toast.dismiss();
            navigate(`/dashboard/${result?.userId}`);

            for (const day of daysOfWeek.filter((day) => day !== "sunday")) {
                toast.loading(`Generating meals for ${day}`);
                await sleep(2000); // Wait for 2 seconds
                await generateMeals(day, result);
                toast.dismiss();
                toast.success(`Meals for ${day} have been generated.`);
            }
          } catch (dbError) {
            console.error(
              `Error saving data ${JSON.stringify(assistantResponse.data)} to database: ${dbError}`
            );
            toast.error("An error occurred while saving your data. Please try again.");
          }
        } else {
          const aiMessage: Message = {
            role: "assistant",
            content: assistantResponse.followUpQuestion,
          };
          addMessage(aiMessage);
        }
      } catch (error) {
        console.error("Error processing AI response:", error);
        toast.error("An error occurred while processing your request. Please try again.");
      }
    },
    [input, messages, addMessage, setInput, processOpenAI, navigate, userMutateAsync, generateMeals]
  );
};

export const ChatService = {
  useSendMessage,
};
