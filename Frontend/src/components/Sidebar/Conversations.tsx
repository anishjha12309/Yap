import useGetConversations from "@/hooks/useGetConversations";
import Conversation from "./Conversation";

interface ConversationsProps {
  onSelectConversation?: () => void;
}

const Conversations = ({ onSelectConversation }: ConversationsProps) => {
  const { loading, conversations } = useGetConversations();
  
  return (
    <div className="chat-conversations">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          onSelect={onSelectConversation}
        />
      ))}

      {loading && (
        <div className="flex justify-center py-4">
          <span className="chat-spinner" />
        </div>
      )}
      
      {!loading && conversations.length === 0 && (
        <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">
          <p className="text-sm">No conversations yet</p>
        </div>
      )}
    </div>
  );
};

export default Conversations;
