import useLogout from "@/hooks/useLogout";
import { LogOutIcon } from "lucide-react";

const LogoutButton = () => {
  const { logout } = useLogout();
  return (
    <div className="ml-[13px] mt-[30px] cursor-pointer">
      <LogOutIcon onClick={logout} />
    </div>
  );
};

export default LogoutButton;
