import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/hooks/useTheme"
import { DropdownMenu, DropdownMenuPortal } from "@radix-ui/react-dropdown-menu"
import { Sun } from "lucide-react"
import { Moon } from "lucide-react"

export default function Navbar() {
  const { theme, updateTheme } = useTheme()
  return (
    <>
      <nav className="sticky top-0 z-10 border-b p-4 bg-white dark:bg-slate-950">
        <div className="container flex items-center justify-between gap-4">
          <span className="text-lg">WDS App</span>
          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {theme == "dark" ? <Moon /> : <Sun />}
              </DropdownMenuTrigger>
              <DropdownMenuPortal>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => updateTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => updateTheme("system")}>
                    System
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
