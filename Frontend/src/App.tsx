import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Home from "./pages/Home/Home";
// import Signup from "./pages/Signup/Signup";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <>
        <h1 className="header">Yap</h1>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <Home />
        </main>
        <footer>
          <ModeToggle />
        </footer>
      </>
    </ThemeProvider>
  );
}

export default App;
