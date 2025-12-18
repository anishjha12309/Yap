import useConversation from "@/zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import Avatar from "@/components/Avatar";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import useListenTyping from "@/hooks/useListenTyping";

interface MessageContainerProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const MessageContainer = ({ onBack, showBackButton }: MessageContainerProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Cleanup on unmount
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  const handleBack = () => {
    setSelectedConversation(null);
    onBack?.();
  };

  return (
    <div className="chat-main">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <ChatHeader onBack={handleBack} showBackButton={showBackButton} />
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

interface ChatHeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
}

const ChatHeader = ({ onBack, showBackButton }: ChatHeaderProps) => {
  const { selectedConversation } = useConversation();
  const { isTyping } = useListenTyping(); // Get typing status
  
  if (!selectedConversation) return null;
  
  return (
    <div className="chat-header">
      {showBackButton && (
        <button 
          onClick={onBack}
          className="chat-back-btn"
          aria-label="Back to conversations"
        >
          <ArrowLeft size={22} />
        </button>
      )}
      <div className="chat-avatar">
        <Avatar 
          src={selectedConversation.profilePic} 
          alt={selectedConversation.fullName} 
          size="md"
        />
      </div>
      <div className="chat-header-info">
        <h2 className="chat-header-name">{selectedConversation.fullName}</h2>
        <p className="chat-header-status">
          {isTyping ? <span className="text-primary italic animate-pulse">Typing...</span> : `@${selectedConversation.username}`}
        </p>
      </div>
    </div>
  );
};

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  
  return (
    <div className="chat-empty">
      <div className="chat-empty-icon">
        <MessageCircle size={36} />
      </div>
      <h2 className="chat-empty-title">
        Welcome, {authUser?.fullName?.split(' ')[0] || 'there'}!
      </h2>
      <p className="chat-empty-text">
        Select a conversation to start messaging
      </p>
    </div>
  );
};

export default MessageContainer;
