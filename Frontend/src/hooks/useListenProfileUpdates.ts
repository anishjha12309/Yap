import { useEffect } from "react";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

const useListenProfileUpdates = () => {
  const { socket } = useSocketContext();
  const { updateConversation, addNewConversation } = useConversation();

  useEffect(() => {
    socket?.on("userProfileUpdated", (updatedUser) => {
      updateConversation(updatedUser);
    });

    socket?.on("newUser", (newUser) => {
      addNewConversation(newUser);
    });

    return () => {
      socket?.off("userProfileUpdated");
      socket?.off("newUser");
    };
  }, [socket, updateConversation, addNewConversation]);
};

export default useListenProfileUpdates;
