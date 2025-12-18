import { create } from "zustand";

export interface Message {
  _id: string;
  senderId: string;
  message: string;
  createdAt: string;
  shouldShake?: boolean;
}

interface Conversation {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (selectedConversation: Conversation | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
