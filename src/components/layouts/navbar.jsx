import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import DarkModeToggle from '../commons/DarkModeToggle'
import { signOut, deleteUser } from 'firebase/auth'
import { deleteDoc, doc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'
import { useAuth } from '../commons/AuthProvider'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [authBusy, setAuthBusy] = useState(false)
  const [authError, setAuthError] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const navigate = useNavigate()
  const userMenuRef = useRef(null)
  const { user, role, loading } = useAuth()

  useEffect(() => {
    // Close user menu when auth state changes
    setAuthError('')
    setUserMenuOpen(false)
  }, [user?.uid])

  useEffect(() => {
    if (!userMenuOpen) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setUserMenuOpen(false)
    }

    const onMouseDown = (e) => {
      if (!userMenuRef.current) return
      if (!userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('mousedown', onMouseDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('mousedown', onMouseDown)
    }
  }, [userMenuOpen])

  const handleLogout = async () => {
    setAuthError('')
    setAuthBusy(true)
    try {
      await signOut(auth)
      setOpen(false)
      setUserMenuOpen(false)
      navigate('/signin')
    } catch (err) {
      setAuthError(err?.message || 'Unable to log out. Please try again.')
    } finally {
      setAuthBusy(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return
    const ok = window.confirm('Are you sure you want to permanently delete your account? This cannot be undone.')
    if (!ok) return

    setAuthError('')
    setAuthBusy(true)
    try {
      const uid = user.uid
      // Best-effort cleanup of user profile doc if it exists
      try {
        await deleteDoc(doc(db, 'users', uid))
      } catch {
        // ignore Firestore deletion failures
      }
      await deleteUser(user)
      setOpen(false)
      setUserMenuOpen(false)
      navigate('/signup')
    } catch (err) {
      if (err?.code === 'auth/requires-recent-login') {
        setAuthError('For security, please log in again and then delete your account.')
        try {
          await signOut(auth)
        } catch {
          // ignore
        }
        setOpen(false)
        setUserMenuOpen(false)
        navigate('/signin')
      } else {
        setAuthError(err?.message || 'Unable to delete account. Please try again.')
      }
    } finally {
      setAuthBusy(false)
    }
  }

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
            {user && (
              <Link to="/user-dashboard" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Dashboard</Link>
            )}
            {user && !loading && role === 'admin' && (
              <Link to="/admin-dashboard" className="neon-hover text-cyan-200 dark:text-cyan-300 hover:text-cyan-100 dark:hover:text-cyan-200 transition-colors" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Admin</Link>
            )}
          </nav>

          <div className="hidden md:flex md:items-center md:space-x-4">
            {user ? (
              <div className="relative z-50" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(v => !v)}
                  disabled={authBusy}
                  className="neon-hover flex items-center gap-2 px-4 py-2 border-2 border-cyan-400 text-cyan-200 dark:text-cyan-300 dark:border-cyan-400 rounded-md hover:bg-cyan-400/10 dark:hover:bg-cyan-400/10 transition disabled:opacity-60"
                  onMouseMove={handleNeonMove}
                  onMouseLeave={handleNeonLeave}
                  aria-haspopup="menu"
                  aria-expanded={userMenuOpen}
                >
                  <span className="max-w-[180px] truncate font-semibold">
                    {user.displayName || user.email || 'Account'}
                  </span>
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 z-50 mt-2 w-80 rounded-md border border-cyan-400/30 bg-slate-950/90 backdrop-blur px-3 py-3 shadow-lg"
                  >
                    <div className="text-cyan-200 dark:text-cyan-300 text-sm font-semibold truncate">
                      {user.displayName || 'Account'}
                    </div>
                    <div className="text-cyan-200/80 dark:text-cyan-300/80 text-xs break-all mt-0.5">
                      {user.email}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={authBusy}
                        className="neon-hover flex-1 px-3 py-2 rounded-md border-2 border-cyan-400 text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition disabled:opacity-60"
                        onMouseMove={handleNeonMove}
                        onMouseLeave={handleNeonLeave}
                        role="menuitem"
                      >
                        {authBusy ? 'Please wait…' : 'Logout'}
                      </button>
                      <button
                        type="button"
                        onClick={handleDeleteAccount}
                        disabled={authBusy}
                        className="neon-hover flex-1 px-3 py-2 rounded-md border-2 border-red-400 text-red-300 hover:bg-red-500/10 transition disabled:opacity-60"
                        onMouseMove={handleNeonMove}
                        onMouseLeave={handleNeonLeave}
                        role="menuitem"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/signin" className="neon-hover px-4 py-2 border-2 border-cyan-400 text-cyan-400 dark:text-cyan-300 dark:border-cyan-400 rounded-md hover:bg-cyan-400/10 dark:hover:bg-cyan-400/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign In</Link>
                <Link to="/signup" className="neon-hover px-4 py-2 bg-cyan-500 dark:bg-cyan-600 text-slate-900 font-semibold hover:bg-cyan-400 dark:hover:bg-cyan-500 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign Up</Link>
              </>
            )}

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
          {user && (
            <Link to="/user-dashboard" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Dashboard</Link>
          )}
          {user && !loading && role === 'admin' && (
            <Link to="/admin-dashboard" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Admin</Link>
          )}
          <div className="mt-2 border-t border-cyan-500 pt-3">
            {user ? (
              <div className="px-3">
                <div className="text-cyan-200 dark:text-cyan-300 text-sm font-semibold">
                  {user.displayName || 'Account'}
                </div>
                <div className="text-cyan-200/80 dark:text-cyan-300/80 text-xs break-all">
                  {user.email}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={authBusy}
                    className="neon-hover flex-1 px-3 py-2 rounded-md border-2 border-cyan-400 text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition disabled:opacity-60"
                    onMouseMove={handleNeonMove}
                    onMouseLeave={handleNeonLeave}
                  >
                    {authBusy ? 'Please wait…' : 'Logout'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={authBusy}
                    className="neon-hover flex-1 px-3 py-2 rounded-md border-2 border-red-400 text-red-300 hover:bg-red-500/10 transition disabled:opacity-60"
                    onMouseMove={handleNeonMove}
                    onMouseLeave={handleNeonLeave}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/signin" onClick={() => setOpen(false)} className="neon-hover block px-3 py-2 rounded-md text-base font-medium text-cyan-200 dark:text-cyan-300 hover:bg-cyan-500/10 dark:hover:bg-cyan-500/10 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign In</Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="neon-hover mt-1 block px-3 py-2 rounded-md bg-cyan-500 dark:bg-cyan-600 text-slate-900 font-semibold text-center hover:bg-cyan-400 dark:hover:bg-cyan-500 transition" onMouseMove={handleNeonMove} onMouseLeave={handleNeonLeave}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {authError && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-2 mb-2 rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {authError}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
