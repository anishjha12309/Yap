import { useState } from "react";
import useConversation from "@/zustand/useConversation";

const useAddReaction = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const addReaction = async (messageId: string, emoji: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${messageId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Update local state
      setMessages(
        messages.map((msg) =>
          msg._id === messageId ? { ...msg, reactions: data.reactions } : msg
        )
      );
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { addReaction, loading };
};

export default useAddReaction;
