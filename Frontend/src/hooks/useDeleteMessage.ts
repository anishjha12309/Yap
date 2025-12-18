import { useState } from "react";
import useConversation from "@/zustand/useConversation";
import toast from "react-hot-toast";

const useDeleteMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useConversation();

  const deleteMessage = async (messageId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      // Remove from local state
      setMessages(messages.filter((msg) => msg._id !== messageId));
      toast.success("Message deleted");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteMessage, loading };
};

export default useDeleteMessage;
