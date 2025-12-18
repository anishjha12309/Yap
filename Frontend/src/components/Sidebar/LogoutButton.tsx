import useLogout from "@/hooks/useLogout";
import { LogOut, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  
  return (
    <div className="chat-logout flex gap-2">
      <Link 
        to="/profile" 
        className="flex items-center justify-center p-3 rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        title="Profile Settings"
      >
        <UserIcon size={20} />
      </Link>
      
      <button 
        className="chat-logout-btn flex-1"
        onClick={logout}
        disabled={loading}
      >
        {loading ? (
          <span className="chat-spinner" />
        ) : (
          <>
            <LogOut size={18} />
            <span>Sign Out</span>
          </>
        )}
      </button>
    </div>
  );
};

export default LogoutButton;
