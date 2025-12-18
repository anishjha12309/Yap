import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const updateProfile = async ({ fullName, username, profilePic }: { fullName: string; username: string; profilePic: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, profilePic }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setAuthUser(data);
      localStorage.setItem("chat-user", JSON.stringify(data));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfile, loading };
};

export default useUpdateProfile;
