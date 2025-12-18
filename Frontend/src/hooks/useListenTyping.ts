import { useEffect, useState } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

const useListenTyping = () => {
  const [isTyping, setIsTyping] = useState(false);
  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("typing", (roomId) => {
      if (selectedConversation?._id === roomId) {
        setIsTyping(true);
      }
    });

    socket?.on("stopTyping", (roomId) => {
      if (selectedConversation?._id === roomId) {
        setIsTyping(false);
      }
    });

    return () => {
      socket?.off("typing");
      socket?.off("stopTyping");
    };
  }, [socket, selectedConversation]);

  return { isTyping };
};

export default useListenTyping;
