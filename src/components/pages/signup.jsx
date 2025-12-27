// src/pages/SignUp.js
import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Added useNavigate
import { auth, db } from '../../firebase/config' // Import auth and db
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setErrors(prev => ({ ...prev, [name]: '' }))
    setSubmitError('')
  }

  const passwordStrength = useMemo(() => {
    const pwd = formData.password || ''
    if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /\d/.test(pwd)) return 'Strong'
    if (pwd.length >= 8) return 'Medium'
    if (pwd.length > 0) return 'Weak'
    return ''
  }, [formData.password])

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.includes('@')) newErrors.email = 'Enter a valid email'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms'
    return newErrors
  }

  const upsertUserProfile = async ({
    user,
    provider,
    firstName = '',
    lastName = '',
  }) => {
    const userRef = doc(db, 'users', user.uid)
    const existing = await getDoc(userRef)

    const payload = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      provider,
      firstName,
      lastName,
      updatedAt: serverTimestamp(),
    }

    if (!existing.exists()) {
      payload.createdAt = serverTimestamp()
      payload.role = 'user'
    }

    await setDoc(userRef, payload, { merge: true })
  }

  // Neon glow position based on mouse (matches navbar behavior)
  const handleNeonMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty('--neon-mx', `${x}px`)
    el.style.setProperty('--neon-my', `${y}px`)
    el.style.setProperty('--neon-opacity', '1')
  }

  const handleNeonLeave = (e) => {
    const el = e.currentTarget
    el.style.setProperty('--neon-opacity', '0')
  }

  const handleSubmit = async (e) => { // Made async
    e.preventDefault()
    setSubmitError('')
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      try {
        // 1. Create User in Auth
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
        const user = userCredential.user;

        // 2. Update Display Name in Auth Profile
        await updateProfile(user, {
            displayName: `${formData.firstName} ${formData.lastName}`
        });

        // 3. Save user to Firestore (idempotent, avoids duplicates)
        await upsertUserProfile({
          user,
          provider: 'password',
          firstName: formData.firstName,
          lastName: formData.lastName,
        })

        // 4. Redirect
        navigate('/')

      } catch (err) {
        console.error(err)
        if(err.code === 'auth/email-already-in-use') {
            setSubmitError('This email is already registered.')
        } else {
            setSubmitError(err.message)
        }
      } finally {
        setLoading(false)
      }
    } else {
      setErrors(newErrors)
    }
  }

  const handleGoogleSignUp = async () => {
    setSubmitError('')

    if (!formData.agreeTerms) {
      setErrors(prev => ({ ...prev, agreeTerms: 'You must agree to terms' }))
      return
    }

    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      const displayName = user.displayName || ''
      const parts = displayName.split(' ').filter(Boolean)
      const firstName = parts[0] || ''
      const lastName = parts.slice(1).join(' ') || ''

      await upsertUserProfile({
        user,
        provider: 'google',
        firstName,
        lastName,
      })

      navigate('/')
    } catch (err) {
      console.error(err)
      if (err?.code === 'auth/popup-closed-by-user') {
        setSubmitError('Google sign-in was closed. Please try again.')
      } else if (err?.code === 'auth/popup-blocked') {
        setSubmitError('Popup was blocked by the browser. Please allow popups and try again.')
      } else {
        setSubmitError(err?.message || 'Google sign-in failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ... (The rest of your return JSX remains exactly the same)
  return (
    <main className="relative overflow-hidden animated-gradient" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Floating particles background animation */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      <div style={{ width: '100%', maxWidth: 980 }} className="relative z-10">
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }} className="text-scale-in">
          {/* Left visual */}
          <div style={{ flex: 1, background: 'linear-gradient(180deg,#06131f,#0b1a2a)', borderRadius: 12, padding: '2rem', color: '#cfefff' }}>
            <h2 style={{ margin: 0, color: '#00d4ff' }}>Join LawVerse</h2>
            <p style={{ marginTop: 12, color: '#a9d9ff' }}>Create your account to start using AI-driven legal workflows: contract review, compliance checks, and rapid research.</p>
            <div style={{ marginTop: 18 }}>
              <strong style={{ color: '#cfefff' }}>Benefits</strong>
              <ul style={{ marginTop: 8, lineHeight: 1.6 }}>
                <li>• 5 free document reviews</li>
                <li>• Secure, encrypted processing</li>
                <li>• Team and enterprise plans</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div style={{ flex: 1, background: '#071827', padding: '2rem', borderRadius: 12, boxShadow: '0 10px 30px rgba(2,8,23,0.6)' }}>
            <div style={{ textAlign: 'center', marginBottom: 12 }}>
              <h1 style={{ margin: 0, color: '#00d4ff' }}>Create an account</h1>
              <p style={{ marginTop: 6, color: '#9fbccf' }}>Start your free trial — no credit card required</p>
            </div>

            {submitError && (
              <div style={{ background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.2)', color: '#ffb3b3', padding: '0.75rem 1rem', borderRadius: 6, marginBottom: 12 }}>
                {submitError}
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="neon-hover"
              onMouseMove={handleNeonMove}
              onMouseLeave={handleNeonLeave}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: 8,
                background: 'transparent',
                color: '#cfefff',
                fontWeight: 700,
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 0 0 1px rgba(0,212,255,0.12), 0 0 26px rgba(0,212,255,0.10)',
                transition: 'transform 120ms ease, box-shadow 200ms ease, border-color 200ms ease',
                cursor: 'pointer',
                marginBottom: 10,
              }}
            >
              {loading ? 'Please wait…' : 'Continue with Google'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
              <div style={{ color: '#9fbccf', fontSize: 12 }}>or</div>
              <div style={{ height: 1, flex: 1, background: 'rgba(255,255,255,0.08)' }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ color: '#9fc9df', fontSize: 13 }}>First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: 8, background: '#071827', color: '#e6f7ff', border: '1px solid rgba(255,255,255,0.06)' }} />
                  {errors.firstName && <div style={{ color: '#ff9b9b', fontSize: 12, marginTop: 6 }}>{errors.firstName}</div>}
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ color: '#9fc9df', fontSize: 13 }}>Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" style={{ width: '100%', padding: '0.65rem 0.9rem', borderRadius: 8, background: '#071827', color: '#e6f7ff', border: '1px solid rgba(255,255,255,0.06)' }} />
                  {errors.lastName && <div style={{ color: '#ff9b9b', fontSize: 12, marginTop: 6 }}>{errors.lastName}</div>}
                </div>
              </div>

              <div>
                <label style={{ color: '#9fc9df', fontSize: 13 }}>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} placeholder="you@company.com" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, background: '#071827', color: '#e6f7ff', border: '1px solid rgba(255,255,255,0.06)' }} />
                {errors.email && <div style={{ color: '#ff9b9b', fontSize: 12, marginTop: 6 }}>{errors.email}</div>}
              </div>

              <div>
                <label style={{ color: '#9fc9df', fontSize: 13 }}>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, background: '#071827', color: '#e6f7ff', border: '1px solid rgba(255,255,255,0.06)' }} />
                <div style={{ marginTop: 6, fontSize: 12, color: passwordStrength === 'Strong' ? '#8ef59b' : passwordStrength === 'Medium' ? '#ffd87a' : '#ff9b9b' }}>{passwordStrength && `Strength: ${passwordStrength}`}</div>
                {errors.password && <div style={{ color: '#ff9b9b', fontSize: 12, marginTop: 6 }}>{errors.password}</div>}
              </div>

              <div>
                <label style={{ color: '#9fc9df', fontSize: 13 }}>Confirm Password</label>
                <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Repeat your password" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 8, background: '#071827', color: '#e6f7ff', border: '1px solid rgba(255,255,255,0.06)' }} />
                {errors.confirmPassword && <div style={{ color: '#ff9b9b', fontSize: 12, marginTop: 6 }}>{errors.confirmPassword}</div>}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#9fbccf', fontSize: 13 }}>
                <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
                <span>I agree to the <Link to="#" style={{ color: '#00d4ff' }}>Terms</Link> and <Link to="#" style={{ color: '#00d4ff' }}>Privacy Policy</Link></span>
              </label>
              {errors.agreeTerms && <div style={{ color: '#ff9b9b', fontSize: 12 }}>{errors.agreeTerms}</div>}

              <button type="submit" disabled={loading} style={{ padding: '0.75rem 1rem', borderRadius: 8, background: '#00d4ff', color: '#07202a', fontWeight: 700, border: 'none', cursor: 'pointer' }}>{loading ? 'Creating account...' : 'Create account'}</button>
            </form>

            <div style={{ textAlign: 'center', marginTop: 12, color: '#9fbccf' }}>
              Already have an account? <Link to="/signin" style={{ color: '#00d4ff', fontWeight: 700 }}>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default SignUp