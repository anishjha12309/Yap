import { createContext, useState, useContext } from "react";

export const AuthContext = createContext<{
  authUser: string | null;
  setAuthUser: React.Dispatch<React.SetStateAction<string | null>>;
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
