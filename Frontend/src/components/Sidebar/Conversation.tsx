import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";
import Avatar from "@/components/Avatar";

interface ConversationProps {
  conversation: {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
    unreadCount?: number;
  };
  onSelect?: () => void;
}

const Conversation = ({ conversation, onSelect }: ConversationProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { fullName, username, profilePic, unreadCount } = conversation;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const handleClick = () => {
    setSelectedConversation(conversation);
    onSelect?.();
  };

  return (
    <div
      className={`chat-conversation-item ${isSelected ? 'active' : ''}`}
      onClick={handleClick}
    >
      <div className="chat-avatar">
        <Avatar src={profilePic} alt={fullName} size="md" />
        {isOnline && <div className="chat-avatar-online" />}
      </div>
      <div className="chat-conversation-info flex-1">
        <p className="chat-conversation-name">{fullName}</p>
        <p className="chat-conversation-username">@{username}</p>
      </div>
      {unreadCount && unreadCount > 0 && (
        <div className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
    </div>
  );
};

export default Conversation;
