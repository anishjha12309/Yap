import { createContext, useState, useContext } from "react";

interface AuthUser {
  _id: string;
  fullName: string;
  username: string;
  profilePic: string;
}

export const AuthContext = createContext<{
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}>({ authUser: null, setAuthUser: () => {} });

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user") || "null") || ""
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
