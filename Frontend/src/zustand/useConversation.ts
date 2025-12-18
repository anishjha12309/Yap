/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ConversationState {
  selectedConversation: any; // Adjust the type according to your needs
  setSelectedConversation: (selectedConversation: any) => void; // Adjust the type according to your needs
  messages: string[]; // Adjust the type according to your needs
  setMessages: (messages: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation: any) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages: string[]) => set({ messages }),
}));

export default useConversation;
