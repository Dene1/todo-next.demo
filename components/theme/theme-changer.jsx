"use client"

import {useTheme} from "next-themes"
import {Button} from "@/components/button/button"
import {useEffect, useState} from "react"

const ThemeChanger = () => {
  const {theme, setTheme} = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
        <div className="flex flex-col gap-2">
          <div>
            The current theme is: <span
              className="font-bold font-mono sm:text-lg">...</span>
          </div>
          <Button className="sm:w-[40%] self-center" disabled>
            Loading...
          </Button>
        </div>
    )
  }

  return (
      <div className="flex flex-col gap-2">
        <div>
          The current theme is: <span
            className="font-bold font-mono sm:text-lg">{theme}</span>
        </div>
        <Button className="sm:w-[50%] self-center"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>Change
          Theme</Button>
      </div>
  )
}

export default ThemeChanger