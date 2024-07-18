import { createContext, ReactNode } from "react"
import { useLocalStorage } from "@/hooks/useLocalStorage"

type ThemeContext = "light" | "dark" | "system"

type Context = {
  theme: ThemeContext
  setTheme: (theme: ThemeContext) => void
  isDark: boolean
}

export const Context = createContext<Context | null>(null)

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useLocalStorage<ThemeContext>("theme", "system")

  function updateTheme(theme: ThemeContext) {
    const isDark =
      theme === "dark" ||
      (theme == "system" && matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList.toggle("dark", isDark)
    setTheme(theme)
  }
  return (
    <Context.Provider
      value={{
        theme,
        setTheme: updateTheme,
        isDark: document.documentElement.classList.contains("dark"),
      }}
    >
      {children}
    </Context.Provider>
  )
}
