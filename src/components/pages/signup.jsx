import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitError('')
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setSubmitError('Authentication is currently disabled.')
      }, 900)
    } else {
      setErrors(newErrors)
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
