import { useState, useRef } from "react";
import { Send, Image as ImageIcon, X } from "lucide-react";
import useSendMessage from "@/hooks/useSendMessage";
import toast from "react-hot-toast";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/zustand/useConversation";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const { loading, sendMessage } = useSendMessage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { socket } = useSocketContext();
  const { selectedConversation } = useConversation();

  const handleTyping = () => {
    socket?.emit("typing", selectedConversation?._id);
    
    // Clear existing timeout
    const timeoutId = setTimeout(() => {
      socket?.emit("stopTyping", selectedConversation?._id);
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  };
    
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024) {
        toast.error("Image size too large. Max 50KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !image) return;
    
    await sendMessage(message, image || undefined);
    setMessage("");
    removeImage();
  };

  return (
    <div className="chat-input-container p-4">
      {image && (
        <div className="relative w-fit mb-2">
          <img src={image} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-border" />
          <button 
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 shadow-sm hover:bg-destructive/90"
          >
            <X size={12} />
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="chat-input-wrapper flex items-center gap-2">
        <input 
          type="file" 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImageChange}
        />
        <button 
          type="button" 
          className="chat-action-btn text-muted-foreground hover:text-foreground transition-colors p-2"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageIcon size={20} />
        </button>
        
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input flex-1 bg-transparent border-none focus:ring-0 px-2 py-1"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleTyping();
          }}
        />
        <button
          type="submit"
          className="chat-send-btn p-2"
          disabled={loading || (!message.trim() && !image)}
        >
          {loading ? (
            <span className="chat-spinner w-5 h-5 block border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
