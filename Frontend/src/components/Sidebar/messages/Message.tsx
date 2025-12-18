import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";

interface MessageProps {
  message: {
    _id: string;
    senderId: string;
    message: string;
    createdAt: string;
    shouldShake?: boolean;
  };
}

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat-message ${fromMe ? 'sent' : 'received'} ${shakeClass}`}>
      <div className="chat-message-avatar">
        <img src={profilePic} alt="Avatar" />
      </div>
      <div className="chat-message-content">
        <div className="chat-message-bubble">
          {message.message}
        </div>
        <span className="chat-message-time">{formattedTime}</span>
      </div>
    </div>
  );
};

export default Message;
