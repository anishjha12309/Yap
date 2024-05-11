import { useState } from "react";
import toast from "react-hot-toast";

interface SignupData {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
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
      const data: ApiResponse = await res.json();
      if (res.ok) {
        console.log(data);
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
