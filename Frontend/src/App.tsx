import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import Signup from "./pages/Signup/Signup";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="header">Yap</h1>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Signup />

        <p>
          Have an account?{" "}
          <span>
            <a
              href="google.com"
              target="_blank"
              className="hover:text-[#48A9A6] text-[#4ECDC4]"
            >
              Login
            </a>
          </span>
        </p>
      </main>

      <footer>
        <ModeToggle />
      </footer>
    </ThemeProvider>
  );
}

export default App;
