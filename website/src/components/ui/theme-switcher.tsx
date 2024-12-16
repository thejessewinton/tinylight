import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '~/utils/cn'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes = [
    {
      name: 'light',
      icon: SunIcon,
    },
    {
      name: 'dark',
      icon: MoonIcon,
    },
    {
      name: 'system',
      icon: ComputerDesktopIcon,
    },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <fieldset className="mt-auto mb-0 flex w-fit items-center gap-1 rounded-lg border border-neutral-200 px-1 py-0.5 dark:border-neutral-700/40">
      <legend className="sr-only">Select a display theme:</legend>
      {themes.map(({ name, icon: Icon }) => (
        <button
          type="button"
          key={name}
          onClick={() => setTheme(name)}
          className={cn(
            'grid cursor-pointer grid-cols-1 place-items-center rounded-lg p-1 hover:bg-neutral-300/60 hover:dark:bg-neutral-800',
            {
              'bg-neutral-300/60 dark:bg-neutral-800': name === theme,
            },
          )}
        >
          <span className="sr-only">{name}</span>
          <Icon className="size-4" />
        </button>
      ))}
    </fieldset>
  )
}
