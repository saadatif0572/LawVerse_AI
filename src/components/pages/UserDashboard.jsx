import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../commons/AuthProvider'

const UserDashboard = () => {
  const { user, role } = useAuth()
  const location = useLocation()
  const [records, setRecords] = useState([])
  const [contactMessages, setContactMessages] = useState([])
  const [profile, setProfile] = useState(null)
  const [profileForm, setProfileForm] = useState({ firstName: '', lastName: '', displayName: '', photoURL: '' })
  const [profileBusy, setProfileBusy] = useState(false)
  const [profileSaved, setProfileSaved] = useState(false)
  const [profileError, setProfileError] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingExtras, setLoadingExtras] = useState(true)
  const [error, setError] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [busyId, setBusyId] = useState('')

  const canSeeAdminLink = role === 'admin'

  const recordsQuery = useMemo(() => {
    if (!user) return null
    return query(collection(db, 'records'), where('ownerId', '==', user.uid))
  }, [user])

  const contactMessagesQuery = useMemo(() => {
    if (!user) return null
    return query(collection(db, 'contactMessages'), where('ownerId', '==', user.uid))
  }, [user])

  const userDocRef = useMemo(() => {
    if (!user) return null
    return doc(db, 'users', user.uid)
  }, [user])

  useEffect(() => {
    if (!recordsQuery) return

    setLoading(true)
    setError('')
    const unsub = onSnapshot(
      recordsQuery,
      (snap) => {
        const next = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setRecords(next)
        setLoading(false)
      },
      (e) => {
        setError(e?.message || 'Failed to load records')
        setLoading(false)
      }
    )
    return () => unsub()
  }, [recordsQuery])

  useEffect(() => {
    if (!contactMessagesQuery) return

    setLoadingExtras(true)
    const unsubMessages = onSnapshot(
      contactMessagesQuery,
      (snap) => {
        const next = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setContactMessages(next)
        setLoadingExtras(false)
      },
      () => {
        setLoadingExtras(false)
      }
    )

    return () => {
      unsubMessages()
    }
  }, [contactMessagesQuery])

  useEffect(() => {
    if (!userDocRef || !user) return

    const unsub = onSnapshot(
      userDocRef,
      (snap) => {
        const next = snap.exists() ? { id: snap.id, ...snap.data() } : null
        setProfile(next)

        const displayNameFromDoc = next?.displayName || ''
        const displayNameFromAuth = user.displayName || ''
        const photoFromDoc = next?.photoURL || ''
        const photoFromAuth = user.photoURL || ''

        setProfileForm({
          firstName: next?.firstName || '',
          lastName: next?.lastName || '',
          displayName: displayNameFromDoc || displayNameFromAuth,
          photoURL: photoFromDoc || photoFromAuth,
        })
      },
      () => {
        // ignore
      }
    )

    return () => unsub()
  }, [userDocRef, user])

  useEffect(() => {
    if (location.hash !== '#profile') return
    const el = document.getElementById('profile-section')
    if (!el) return
    setTimeout(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }, [location.hash])

  const recentContactMessages = useMemo(() => {
    return [...contactMessages]
      .sort((a, b) => {
        const at = new Date(a?.createdAt || 0).getTime()
        const bt = new Date(b?.createdAt || 0).getTime()
        return bt - at
      })
      .slice(0, 5)
  }, [contactMessages])

  const isProfileComplete = Boolean(
    (profileForm.firstName || '').trim() &&
    (profileForm.lastName || '').trim() &&
    (profileForm.displayName || '').trim()
  )

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({ ...prev, [name]: value }))
    setProfileError('')
    setProfileSaved(false)
  }

  const handleSaveProfile = async () => {
    if (!userDocRef || !user) return
    const firstName = profileForm.firstName.trim()
    const lastName = profileForm.lastName.trim()
    const displayName = profileForm.displayName.trim()
    const photoURL = profileForm.photoURL.trim()

    if (!firstName || !lastName || !displayName) {
      setProfileError('First name, last name, and display name are required.')
      return
    }

    setProfileBusy(true)
    setProfileError('')
    try {
      await updateDoc(userDocRef, {
        firstName,
        lastName,
        displayName,
        photoURL,
        updatedAt: serverTimestamp(),
      })
      await updateProfile(user, {
        displayName,
        photoURL: photoURL || null,
      })
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 2500)
    } catch (e) {
      setProfileError(e?.message || 'Failed to update profile')
    } finally {
      setProfileBusy(false)
    }
  }

  const handleAdd = async () => {
    if (!user) return
    const title = newTitle.trim()
    if (!title) return
    setError('')
    try {
      await addDoc(collection(db, 'records'), {
        title,
        ownerId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      setNewTitle('')
    } catch (e) {
      setError(e?.message || 'Failed to create record')
    }
  }

  const handleRename = async (id, currentTitle) => {
    const next = window.prompt('Update title', currentTitle)
    if (next === null) return
    const title = next.trim()
    if (!title) return
    setBusyId(id)
    setError('')
    try {
      await updateDoc(doc(db, 'records', id), { title, updatedAt: serverTimestamp() })
    } catch (e) {
      setError(e?.message || 'Failed to update record')
    } finally {
      setBusyId('')
    }
  }

  const handleDelete = async (id) => {
    const ok = window.confirm('Delete this record?')
    if (!ok) return
    setBusyId(id)
    setError('')
    try {
      await deleteDoc(doc(db, 'records', id))
    } catch (e) {
      setError(e?.message || 'Failed to delete record')
    } finally {
      setBusyId('')
    }
  }

  return (
    <main className="relative overflow-hidden animated-gradient" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 style={{ margin: 0, color: '#00d4ff', fontSize: '1.8rem', fontWeight: 800 }}>User Dashboard</h1>
        <p style={{ marginTop: 10, color: '#a9d9ff' }}>
          Signed in as <span style={{ color: '#cfefff', fontWeight: 700 }}>{user?.email}</span>
          {canSeeAdminLink ? <span style={{ marginLeft: 8, color: '#8ef59b' }}>(admin)</span> : null}
        </p>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>My Records</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{records.length}</div>
            <div style={{ marginTop: 8, color: '#a9d9ff', fontSize: 13 }}>Draft and manage your saved items.</div>
          </div>

          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>My Contact Requests</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{contactMessages.length}</div>
            <div style={{ marginTop: 8, color: '#a9d9ff', fontSize: 13 }}>
              <Link to="/contact" style={{ color: '#00d4ff', fontWeight: 800, textDecoration: 'underline' }}>Open Contact</Link>
            </div>
          </div>

          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>My Profile</div>
            <div style={{ marginTop: 6, color: isProfileComplete ? '#8ef59b' : '#ffcc66', fontSize: 16, fontWeight: 900 }}>
              {isProfileComplete ? 'Complete' : 'Needs update'}
            </div>
            <div style={{ marginTop: 8, color: '#a9d9ff', fontSize: 13 }}>
              <Link to="/user-dashboard#profile" style={{ color: '#00d4ff', fontWeight: 800, textDecoration: 'underline' }}>Add / Update</Link>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12, background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.2)', color: '#ffb3b3', padding: '0.75rem 1rem', borderRadius: 6 }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 14, background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.18)', borderRadius: 12, padding: '0.9rem 1rem' }}>
          <div style={{ color: '#cfefff', fontWeight: 900 }}>Legal tip</div>
          <div style={{ marginTop: 6, color: '#b7e9ff', fontSize: 13, lineHeight: 1.55 }}>
            Before sharing documents, confirm confidentiality terms and redact personal data where required.
            For filing deadlines, always verify the correct jurisdiction and limitation period.
          </div>
        </div>

        <div style={{ marginTop: 18, background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#cfefff', fontWeight: 700 }}>Recent contact requests</div>
          <div style={{ marginTop: 10, color: '#9fbccf' }}>
            {loadingExtras ? 'Loading…' : recentContactMessages.length === 0 ? 'No contact requests yet.' : null}
          </div>

          {recentContactMessages.length > 0 && (
            <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
              {recentContactMessages.map((m) => (
                <div key={m.id} style={{ padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(7,24,39,0.7)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
                    <div style={{ color: '#cfefff', fontWeight: 800 }}>{m.inquiryType || 'Request'}</div>
                    <div style={{ color: '#9fbccf', fontSize: 12 }}>{m.createdAt ? new Date(m.createdAt).toLocaleString() : ''}</div>
                  </div>
                  <div style={{ marginTop: 6, color: '#a9d9ff', fontSize: 13 }}>
                    {m.practiceArea ? `${m.practiceArea} • ` : ''}{m.firmName || ''}
                  </div>
                  <div style={{ marginTop: 6, color: '#cfefff', fontSize: 13, lineHeight: 1.45 }}>
                    {(m.message || '').slice(0, 140)}{(m.message || '').length > 140 ? '…' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div id="profile-section" style={{ marginTop: 18, background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ color: '#cfefff', fontWeight: 900 }}>Edit profile</div>
            <div style={{ color: '#9fbccf', fontSize: 12 }}>User ID: {user?.uid?.slice(0, 8)}…</div>
          </div>

          <div style={{ marginTop: 8, color: '#a9d9ff', fontSize: 13 }}>
            Email: <span style={{ color: '#cfefff', fontWeight: 800 }}>{user?.email}</span>
          </div>

          {profileError && (
            <div style={{ marginTop: 12, background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.2)', color: '#ffb3b3', padding: '0.75rem 1rem', borderRadius: 6 }}>
              {profileError}
            </div>
          )}
          {profileSaved && (
            <div style={{ marginTop: 12, background: 'rgba(142,245,155,0.10)', border: '1px solid rgba(142,245,155,0.25)', color: '#8ef59b', padding: '0.75rem 1rem', borderRadius: 6 }}>
              Profile updated.
            </div>
          )}

          <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <div>
              <label style={{ color: '#9fc9df', fontSize: 13 }}>First Name</label>
              <input
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                placeholder="First name"
                style={{ width: '100%', marginTop: 6, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
              />
            </div>

            <div>
              <label style={{ color: '#9fc9df', fontSize: 13 }}>Last Name</label>
              <input
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                placeholder="Last name"
                style={{ width: '100%', marginTop: 6, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
              />
            </div>

            <div>
              <label style={{ color: '#9fc9df', fontSize: 13 }}>Display Name</label>
              <input
                name="displayName"
                value={profileForm.displayName}
                onChange={handleProfileChange}
                placeholder="Display name"
                style={{ width: '100%', marginTop: 6, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
              />
            </div>

            <div>
              <label style={{ color: '#9fc9df', fontSize: 13 }}>Photo URL (optional)</label>
              <input
                name="photoURL"
                value={profileForm.photoURL}
                onChange={handleProfileChange}
                placeholder="https://..."
                style={{ width: '100%', marginTop: 6, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
              />
            </div>
          </div>

          <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleSaveProfile}
              disabled={profileBusy}
              style={{ padding: '0.75rem 1rem', borderRadius: 8, background: '#00d4ff', color: '#07202a', fontWeight: 900, border: 'none', cursor: 'pointer', opacity: profileBusy ? 0.8 : 1 }}
            >
              {profileBusy ? 'Saving…' : 'Save Profile'}
            </button>
          </div>

          <div style={{ marginTop: 10, color: '#9fbccf', fontSize: 12 }}>
            Your role is <span style={{ color: '#cfefff', fontWeight: 800 }}>{profile?.role || role || 'user'}</span>.
          </div>
        </div>

        <div style={{ marginTop: 18, background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#cfefff', fontWeight: 700 }}>Your records</div>

          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="New record title"
              style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: '#071827', color: '#e6f7ff' }}
            />
            <button
              type="button"
              onClick={handleAdd}
              style={{ padding: '0.75rem 1rem', borderRadius: 8, background: '#00d4ff', color: '#07202a', fontWeight: 800, border: 'none', cursor: 'pointer' }}
            >
              Add
            </button>
          </div>

          <div style={{ marginTop: 14, color: '#9fbccf' }}>
            {loading ? 'Loading…' : records.length === 0 ? 'No records yet.' : null}
          </div>

          {records.length > 0 && (
            <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
              {records.map((r) => (
                <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'center', padding: '0.9rem 1rem', borderRadius: 10, border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(7,24,39,0.7)' }}>
                  <div style={{ color: '#cfefff', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.title || '(untitled)'}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => handleRename(r.id, r.title || '')}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: 8, border: '1px solid rgba(255,255,255,0.14)', background: 'transparent', color: '#cfefff', cursor: 'pointer' }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled={busyId === r.id}
                      onClick={() => handleDelete(r.id)}
                      style={{ padding: '0.45rem 0.75rem', borderRadius: 8, border: '1px solid rgba(255,68,68,0.35)', background: 'transparent', color: '#ffb3b3', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default UserDashboard
