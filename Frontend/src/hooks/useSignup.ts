import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import toast from "react-hot-toast";

interface SignupData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }: SignupData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
