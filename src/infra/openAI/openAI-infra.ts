import { openAIMiniClient, openAIClient, OPENAI_CONFIG } from "../configs/openAI.config";
import type { Message } from "./response/content-request.model";
import type { OpenAIResponse } from './response/content-response.model';


type GetCompletionType = (messages: Message[], systemPrompt : string) => Promise<OpenAIResponse>;

const getCompletion: GetCompletionType = async (allMessages, systemPrompt) => {
  try {

    const allMessagesWithSystem: Message[] = [
      { role: 'system', content: systemPrompt },
      ...allMessages
    ];

    const result = await openAIMiniClient.post('/chat/completions', {
      messages: allMessagesWithSystem,
      temperature: OPENAI_CONFIG.TEMPERATURE,
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      response_format:{"type":"json_object"} 
    });    
    
    return result.data ?? "No response.";
    
  } catch (error) {
    console.error('Error getting completion:', error);
    return "Error occurred while fetching response.";
  }
};

const getCompletionImage: GetCompletionType = async (allMessages, systemPrompt) => {
  try {

    const allMessagesWithSystem: Message[] = [
      { role: 'system', content: systemPrompt },
      ...allMessages
    ];

    const result = await openAIClient.post('/chat/completions', {
      messages: allMessagesWithSystem,
      temperature: OPENAI_CONFIG.TEMPERATURE,
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      response_format:{"type":"json_object"}
    });    
    
    return result.data ?? "No response.";
    
  } catch (error) {
    console.error('Error getting completion:', error);
    return "Error occurred while fetching response.";
  }
};

export const OpenAIAPI = {
  getCompletion,
  getCompletionImage,

};