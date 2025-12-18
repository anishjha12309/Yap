import { useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import Avatar from "@/components/Avatar";
import { Check, CheckCheck, Trash2, SmilePlus } from "lucide-react";
import useDeleteMessage from "@/hooks/useDeleteMessage";
import useAddReaction from "@/hooks/useAddReaction";

interface Reaction {
  emoji: string;
  userId: string;
}

interface MessageProps {
  message: {
    _id: string;
    senderId: string;
    message: string;
    image?: string;
    createdAt: string;
    shouldShake?: boolean;
    isRead?: boolean;
    reactions?: Reaction[];
  };
}

const EMOJI_OPTIONS = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

const Message = ({ message }: MessageProps) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { deleteMessage, loading: deleting } = useDeleteMessage();
  const { addReaction } = useAddReaction();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const fromMe = message.senderId === authUser?._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const handleDelete = () => {
    if (window.confirm("Delete this message?")) {
      deleteMessage(message._id);
    }
  };

  const handleReaction = (emoji: string) => {
    addReaction(message._id, emoji);
    setShowEmojiPicker(false);
  };

  // Group reactions by emoji and count
  const groupedReactions = message.reactions?.reduce((acc, r) => {
    acc[r.emoji] = (acc[r.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className={`chat ${chatClassName} group`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar 
            src={fromMe ? authUser?.profilePic : selectedConversation?.profilePic} 
            alt="user avatar" 
            size={40}
          />
        </div>
      </div>
      <div className="relative">
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
          {message.message && <p>{message.message}</p>}
        </div>
        
        {/* Reactions display */}
        {Object.keys(groupedReactions).length > 0 && (
          <div className={`flex gap-1 mt-1 ${fromMe ? 'justify-end' : 'justify-start'}`}>
            {Object.entries(groupedReactions).map(([emoji, count]) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="bg-card/80 backdrop-blur-sm text-xs px-1.5 py-0.5 rounded-full flex items-center gap-0.5 hover:bg-card transition-colors border border-border/50"
              >
                {emoji} {count > 1 && <span className="text-muted-foreground">{count}</span>}
              </button>
            ))}
          </div>
        )}
        
        {/* Action buttons on hover */}
        <div className={`absolute ${fromMe ? '-left-14' : '-right-14'} top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1`}>
          {/* Emoji picker button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-muted-foreground hover:text-foreground p-1"
            title="Add reaction"
          >
            <SmilePlus size={14} />
          </button>
          
          {fromMe && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-destructive hover:text-destructive/80 p-1"
              title="Delete message"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
        
        {/* Emoji picker popup */}
        {showEmojiPicker && (
          <div className={`absolute ${fromMe ? 'right-0' : 'left-0'} -top-10 bg-card border border-border rounded-lg shadow-lg p-1 flex gap-1 z-50`}>
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="hover:bg-secondary p-1 rounded transition-colors text-lg"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
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
