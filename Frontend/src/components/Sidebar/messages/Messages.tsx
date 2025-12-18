import useGetMessages from "@/hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "@/components/skeletons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessages from "@/hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Use setTimeout to ensure DOM is rendered
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <div className="chat-messages">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}

      {loading && 
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      }
      
      {!loading && messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-center" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Send a message to start the conversation
          </p>
        </div>
      )}
      
      {/* Invisible element at the end to scroll to */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
