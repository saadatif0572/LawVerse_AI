import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // read preference from localStorage or system preference
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    } else {
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="px-4 py-2 rounded-lg border-2 border-current bg-transparent text-current hover:opacity-70 dark:border-cyan-400 dark:text-cyan-400 transition-all duration-200 flex items-center gap-2 font-semibold hover:shadow-md"
      title={isDark ? 'Click to switch to light mode' : 'Click to switch to dark mode'}
    >
      {isDark ? (
        <>
          <span className="text-lg">🌙</span>
          <span>Dark</span>
        </>
      ) : (
        <>
          <span className="text-lg">☀️</span>
          <span>Light</span>
        </>
      )}
    </button>
  )
}

export default DarkModeToggle
