import SearchInput from "./SearchInput";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";

interface SidebarProps {
  onSelectConversation?: () => void;
}

const Sidebar = ({ onSelectConversation }: SidebarProps) => {
  return (
    <aside className="chat-sidebar">
      <div className="chat-sidebar-header">
        <h1 className="chat-sidebar-title">Messages</h1>
        <SearchInput />
      </div>
      <Conversations onSelectConversation={onSelectConversation} />
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
