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
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  updateConversation: (updatedConversation: Conversation) => void;
  addNewConversation: (newConversation: Conversation) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  updateConversation: (updatedConversation) => 
    set((state) => ({
      conversations: state.conversations.map((c) => 
        c._id === updatedConversation._id ? { ...c, ...updatedConversation } : c
      ),
      selectedConversation: state.selectedConversation?._id === updatedConversation._id 
        ? { ...state.selectedConversation, ...updatedConversation } 
        : state.selectedConversation
    })),
  addNewConversation: (newConversation) =>
    set((state) => ({
      conversations: [...state.conversations, newConversation]
    })),
}));

export default useConversation;
