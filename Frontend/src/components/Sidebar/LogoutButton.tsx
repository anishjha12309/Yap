import useLogout from "@/hooks/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  
  return (
    <div className="chat-logout">
      <button 
        className="chat-logout-btn"
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
