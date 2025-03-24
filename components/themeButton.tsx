"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeButton() {
  const { setTheme, theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  React.useEffect(() => {
    // Check the theme only on the client-side
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    setIsDarkMode(theme === "dark" || (theme === "system" && prefersDarkMode))
  }, [theme]);
  
  return (
    <Button variant="outline" size="icon"  className="cursor-pointer" onClick={() => {
      
      if (theme === "light") {
        setTheme("dark")
      } else if (theme === "dark") {
        setTheme("light")
      } else {
        setTheme("system")
      }
    }}>
      
      {isDarkMode ? (
        <Sun className="h-[1.2rem] w-[1.2rem] dark:to-white" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] dark:scale-100" />
      )}
    </Button>
  )
}
