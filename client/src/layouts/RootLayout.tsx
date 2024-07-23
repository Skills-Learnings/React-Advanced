import { Toaster } from "@/components/ui/toaster"
import { Outlet, ScrollRestoration } from "react-router-dom"
import Navbar from "./Navbar"
import ThemeProvider from "@/contexts/ThemeContext"
import { AuthProvider } from "@/features/auth/contexts/AuthProvider"

export function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="container my-4 flex-grow grid grid-cols-1">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
        <ScrollRestoration />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}
