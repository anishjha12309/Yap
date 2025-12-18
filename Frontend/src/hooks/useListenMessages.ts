import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage: any) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play().catch(() => {});
      setMessages([...messagesRef.current, newMessage]);
    };

    const handleMessagesRead = (messageIds: string[]) => {
      setMessages(
        messagesRef.current.map((msg) =>
          messageIds.includes(msg._id) ? { ...msg, isRead: true } : msg
        )
      );
    };

    socket?.on("newMessage", handleNewMessage);
    socket?.on("messagesRead", handleMessagesRead);

    return () => {
      socket?.off("newMessage", handleNewMessage);
      socket?.off("messagesRead", handleMessagesRead);
    };
  }, [socket, setMessages]);
};

export default useListenMessages;