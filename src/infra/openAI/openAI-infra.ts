import { axiosClient, OPENAI_CONFIG } from "../configs/openAI.config";
import type { Message } from "./response/content-request.model";
import type { OpenAIResponse } from './response/content-response.model';


type GetCompletionType = (messages: Message[], systemPrompt : string) => Promise<OpenAIResponse>;

const getCompletion: GetCompletionType = async (allMessages, systemPrompt) => {
  try {

    const allMessagesWithSystem: Message[] = [
      { role: 'system', content: systemPrompt },
      ...allMessages
    ];

    const result = await axiosClient.post('/chat/completions', {
      messages: allMessagesWithSystem,
      temperature: OPENAI_CONFIG.TEMPERATURE,
      max_tokens: OPENAI_CONFIG.MAX_TOKENS 
    });    
    
    return result.data ?? "No response.";
    
  } catch (error) {
    console.error('Error getting completion:', error);
    return "Error occurred while fetching response.";
  }
};

export const OpenAIAPI = {
  getCompletion,
};