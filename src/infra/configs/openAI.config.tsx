import axios from 'axios';

export const OPENAI_CONFIG = {
  BASE_URL: 'https://nutripilot-ai.openai.azure.com/',
  API_KEY: 'AjhElEmfpa1U4PHAc5XWqd6Al17YlnaMPfI66T71wNqHTBZJRYzMJQQJ99AKAC5T7U2XJ3w3AAABACOGUQfl', // Move API key to environment variable
  TEMPERATURE: 1,
  MAX_TOKENS: 1000,
  DEPLOYMENT : "gpt-4",
  API_VERSION : "2024-08-01-preview"
};

export const axiosClient = axios.create({
  baseURL: `${OPENAI_CONFIG.BASE_URL}/openai/deployments/${OPENAI_CONFIG.DEPLOYMENT}`,
  params: {
    'api-version': OPENAI_CONFIG.API_VERSION
  },
  headers: {
    'api-key': OPENAI_CONFIG.API_KEY,
    'Content-Type': 'application/json'
  }
});