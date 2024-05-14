import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Navigate, Route, Routes } from "react-router-dom";
// @ts-expect-error:Importing JSX File in TSX File
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

export function App() {
  const { authUser } = useAuthContext();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <h1 className="header">Yap</h1>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Routes>
            <Route
              path="/"
              element={authUser ? <Home /> : <Navigate to={"/signin"} />}
            />
            <Route
              path="/signin"
              element={authUser ? <Navigate to="/" /> : <SignIn />}
            />
            <Route
              path="/signup"
              element={authUser ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
          <Toaster />
        </main>
        <footer>
          <ModeToggle />
        </footer>
      </>
    </ThemeProvider>
  );
}

export default App;
