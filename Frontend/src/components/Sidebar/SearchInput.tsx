import { useState } from "react";
import { Search } from "lucide-react";
import useConversation from "@/zustand/useConversation";
import useGetConversations from "@/hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) return;

    if (searchTerm.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }
    
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (conversation) {
      setSelectedConversation(conversation);
      setSearchTerm("");
    } else {
      toast.error(`No user found matching "${searchTerm}"`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-search">
      <div className="chat-search-icon">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="Search conversations..."
        className="chat-search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchInput;
