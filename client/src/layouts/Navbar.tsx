import { Button } from "@/components/ui/button"
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme"
import { DropdownMenu, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { Menu, Sun } from "lucide-react"
import { Moon } from "lucide-react"
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b p-4 bg-white dark:bg-slate-950">
        <div className="container flex items-center justify-between gap-4">
          <span className="text-lg">WDS App</span>
          <div className="flex">
            <ThemeButton />
            <div className="hidden sm:flex">
              <NavItem to="/tasks" label="Task Board" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="flex sm:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/tasks">Task Board</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenuPortal>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  )
}

type NavItemProps = {
  to: string
  label: string
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <div>
      <Button variant="ghost">
        <Link to={to}>{label}</Link>
      </Button>
    </div>
  )
}

function ThemeButton() {
  const { setTheme } = useTheme()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800"
        >
          <Moon className="h-5 w-5 scale-0 dark:scale-100 transition-transform" />
          <Sun className="absolute h-5 w-5 scale-100 dark:scale-0 transition-transform" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
