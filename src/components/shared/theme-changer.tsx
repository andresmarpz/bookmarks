import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '~/lib/utils'

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  const handleClick = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button
      type="button"
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded p-1',
        'hover:bg-gray-100 dark:hover:bg-gray-800',
        'focus:outline-none focus:ring-2 focus:ring-gray-800 dark:focus:ring-gray-200'
      )}
      onClick={theme === undefined ? undefined : handleClick}
      aria-label="Toggle current website theme between dark and light"
      disabled={!theme}
    >
      {theme === undefined ? (
        <div className="h-5 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      ) : theme === 'dark' ? (
        <Sun
          className="h-5 w-5"
          aria-label="Icon of the sun to turn on light theme"
        />
      ) : (
        <Moon
          className="h-5 w-5"
          aria-label="Icon of the moon to turn on dark mode"
        />
      )}
    </button>
  )
}
