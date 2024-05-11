import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import SignIn from "./pages/Signin/Signin";
import { Toaster } from "react-hot-toast";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <h1 className="header">Yap</h1>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
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
