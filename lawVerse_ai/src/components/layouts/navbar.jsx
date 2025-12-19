import { Link } from 'react-router-dom'
import { useState } from 'react'
import DarkModeToggle from '../commons/DarkModeToggle'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  // Set neon glow position based on mouse inside element
  const handleNeonMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left // x position within the element
    const y = e.clientY - rect.top // y position within the element
    // set as px to keep precision
    el.style.setProperty('--neon-mx', `${x}px`)
    el.style.setProperty('--neon-my', `${y}px`)
    el.style.setProperty('--neon-opacity', '1')
  }

  const handleNeonLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--neon-opacity', '0')
  }

  return (
    <header className="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-cyan-400 dark:text-cyan-300 font-bold text-lg md:text-xl hover:text-cyan-300 dark:hover:text-cyan-200 transition-colors">
              <span className="mr-2 text-2xl">⚖️</span>
              <span>LawVerse AI</span>
            </Link>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-8" aria-label="Primary navigation">
            <Link to="/" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Home</Link>
            <Link to="/about" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>About</Link>
            <Link to="/services" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Services</Link>
            <Link to="/privacy-policy" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Privacy Policy</Link>
            <Link to="/contact" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Contact</Link>
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/signin" className="neon-hover px-4 py-2 border-2 border-cyan-400 text-cyan-400 dark:text-cyan-300 dark:border-cyan-400 rounded-md hover:bg-cyan-400/10 dark:hover:bg-cyan-400/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign In</Link>
            <Link to="/signup" className="neon-hover px-4 py-2 bg-cyan-500 dark:bg-cyan-600 text-slate-900 font-semibold hover:bg-cyan-400 dark:hover:bg-cyan-500 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign Up</Link>
            {/* Dark mode toggle */}
            <div className="ml-3">
              <DarkModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-controls="mobile-menu"
              aria-expanded={open}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyan-400 dark:text-cyan-300 hover:text-cyan-300 dark:hover:text-cyan-200 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state. */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-transparent border-t border-cyan-500">
          <Link to="/" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>About</Link>
          <Link to="/services" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Services</Link>
          <Link to="/privacy-policy" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Privacy Policy</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Contact</Link>
          <div className="mt-2 border-t border-cyan-500 pt-3">
            <Link to="/signin" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign In</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="neon-hover mt-1 block px-3 py-2 rounded-md bg-cyan-500 dark:bg-cyan-600 text-slate-900 font-semibold text-center hover:bg-cyan-400 dark:hover:bg-cyan-500 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign Up</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
