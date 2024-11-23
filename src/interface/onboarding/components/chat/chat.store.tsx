/*
Constains all states of the chat component, and fn to modify it.

In our case we have "input" and "messages" states.
*/
import { create } from "zustand";
import type { Message } from "../../../../infra/openAI/response/content-request.model";

interface ChatStore {
  messages: Message[];
  addMessage: (chat: Message) => void;
  input: string;
  setInput: (input: string) => void;
  isPending: boolean;
  setIsPending: (isPending: boolean) => void;
}

const useChatStore = create<ChatStore>((set) => ({
  messages: [{ "role":"assistant", "content":"Hello, I'm a nutrition assistant, nice to meet you! Please tell me about your personal details and fitness goals."}],
  input: "",
  addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
  setInput: (input: string) => set({ input }),
  isPending: false,
  setIsPending: (isPending: boolean) => set({ isPending: isPending}),
}));

export const ChatStore = {
  useChatStore,
};
