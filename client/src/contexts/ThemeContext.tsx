import { createContext, ReactNode } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type ThemeContext = "light" | "dark" | "system"

type Context = {
  theme: ThemeContext
  updateTheme: (theme: ThemeContext) => void
}

export const Context = createContext<Context | null>(null)

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<ThemeContext>("theme", "light")

  function updateTheme(theme: ThemeContext) {
    let appTheme = theme
    if (theme === "system") {
      appTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }
    document.documentElement.classList.toggle("dark", appTheme === "dark")
    setTheme(theme)
  }
  return (
    <Context.Provider value={{ theme, updateTheme }}>
      {children}
    </Context.Provider>
  )
}
