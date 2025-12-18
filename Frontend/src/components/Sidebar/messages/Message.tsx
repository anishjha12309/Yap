import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import Avatar from "@/components/Avatar";
import { Check, CheckCheck } from "lucide-react";

interface MessageProps {
  message: {
    _id: string;
    senderId: string;
    message: string;
    image?: string;
    createdAt: string;
    shouldShake?: boolean;
    isRead?: boolean;
  };
}

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  // const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar 
            src={fromMe ? authUser?.profilePic : selectedConversation?.profilePic} 
            alt="user avatar" 
            size={40}
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.image && (
          <img 
            src={message.image} 
            alt="Attachment" 
            className="rounded-md max-w-[200px] mb-2 cursor-pointer hover:scale-105 transition-transform"
          />
        )}
        <p>{message.message}</p>
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
        {fromMe && (
          <span className={message.isRead ? "text-blue-500" : ""}>
             {message.isRead ? <CheckCheck size={16} /> : <Check size={16} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Message;
