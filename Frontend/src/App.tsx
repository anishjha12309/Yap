import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin";
import ProfileSettings from "./pages/Profile/ProfileSettings";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

export function App() {
  const { authUser } = useAuthContext();
  
  // Check if we're on auth pages
  const isAuthPage = !authUser;
  
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className={isAuthPage ? "h-screen overflow-hidden" : "h-screen overflow-hidden"}>
        {/* Theme toggle - floating in corner */}
        <div className="fixed top-4 right-4 z-50">
          <ModeToggle />
        </div>
        
        {isAuthPage ? (
          // Auth pages - full screen, no header
          <>
            <Routes>
              <Route
                path="/"
                element={<Navigate to={"/signin"} />}
              />
              <Route
                path="/signin"
                element={<SignIn />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
            </Routes>
            <Toaster />
          </>
        ) : (
          // Authenticated - show chat interface
          <>
            <Routes>
              <Route
                path="/"
                element={<Home />}
              />
              <Route
                path="/signin"
                element={<Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={<Navigate to="/" />}
              />
              <Route
                path="/profile"
                element={<ProfileSettings />}
              />
            </Routes>
            <Toaster />
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
