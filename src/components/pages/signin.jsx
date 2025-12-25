import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth } from '../../firebase/config'

const getAuthErrorMessage = (error) => {
  const code = error?.code
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password'
    case 'auth/invalid-email':
      return 'Please enter a valid email address'
    case 'auth/user-disabled':
      return 'This account has been disabled'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    default:
      return error?.message || 'Unable to sign in. Please try again.'
  }
}

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please provide both email and password')
      return
    }

    setLoading(true)
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (err) {
      setError(getAuthErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative overflow-hidden animated-gradient" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div style={{ width: '100%', maxWidth: 1000 }} className="relative z-10">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="text-scale-in">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            background: '#0b1624',
            borderRadius: 12,
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(2,8,23,0.6)'
          }}>

            {/* Left promo panel */}
            <div style={{ flex: 1.1, padding: '2.25rem', background: 'linear-gradient(180deg,#071029,#0b1624)', color: '#cfefff' }}>
              <h2 style={{ fontSize: '1.6rem', margin: 0, color: '#00d4ff' }}>Welcome back to LawVerse</h2>
              <p style={{ marginTop: 12, color: '#a9d9ff', lineHeight: 1.5 }}>Sign in to access AI-powered legal tools — contract review, research, and compliance checks in seconds.</p>
              <ul style={{ marginTop: 16, color: '#cdeeff', lineHeight: 1.6 }}>
                <li>• Instant contract summaries</li>
                <li>• Secure document analysis</li>
                <li>• Fast legal research</li>
              </ul>
            </div>

            {/* Right form panel */}
            <div style={{ flex: 1, padding: '2rem', background: '#071827' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h1 style={{ margin: 0, fontSize: '1.4rem', color: '#00d4ff' }}>⚖️ LawVerse AI</h1>
                <p style={{ marginTop: 6, color: '#92bcd6' }}>Sign in to your account</p>
              </div>

              {error && (
                <div style={{ background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.2)', color: '#ffb3b3', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: 12 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label style={{ color: '#9fc9df', fontSize: 13 }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
                />

                <label style={{ color: '#9fc9df', fontSize: 13 }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#9fbccf' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> <span>Remember me</span>
                  </label>
                  <Link to="#" style={{ color: '#00d4ff', textDecoration: 'none' }}>Forgot?</Link>
                </div>

                <button type="submit" disabled={loading} style={{ marginTop: 6, padding: '0.75rem 1rem', borderRadius: 8, background: '#00d4ff', color: '#07202a', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div style={{ textAlign: 'center', marginTop: 12, color: '#9fbccf', fontSize: 13 }}>
                Don't have an account? <Link to="/signup" style={{ color: '#00d4ff', fontWeight: 700 }}>Create one</Link>
              </div>
            </div>
          </div>

          {/* Demo / small info */}
          <div style={{ textAlign: 'center', color: '#9fbccf', fontSize: 13 }}>
            <small>Demo: demo@lawverse.com / demo123</small>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignIn
