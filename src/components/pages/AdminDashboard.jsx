import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { addDoc, collection, deleteDoc, doc, getCountFromServer, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useAuth } from '../commons/AuthProvider'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [recentUsers, setRecentUsers] = useState([])
  const [recentLawyers, setRecentLawyers] = useState([])
  const [recentMessages, setRecentMessages] = useState([])
  const [counts, setCounts] = useState({ users: 0, lawyers: 0, messages: 0, records: 0 })
  const [loading, setLoading] = useState(true)
  const [loadingExtras, setLoadingExtras] = useState(true)
  const [error, setError] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [busyId, setBusyId] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    const unsub = onSnapshot(
      collection(db, 'records'),
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
  }, [])

  useEffect(() => {
    let cancelled = false
    const loadCounts = async () => {
      try {
        const [usersSnap, lawyersSnap, messagesSnap, recordsSnap] = await Promise.all([
          getCountFromServer(collection(db, 'users')),
          getCountFromServer(collection(db, 'lawyers')),
          getCountFromServer(collection(db, 'contactMessages')),
          getCountFromServer(collection(db, 'records')),
        ])
        if (cancelled) return
        setCounts({
          users: usersSnap.data().count,
          lawyers: lawyersSnap.data().count,
          messages: messagesSnap.data().count,
          records: recordsSnap.data().count,
        })
      } catch {
        // If counts fail (permissions / offline), keep zeros.
      }
    }
    loadCounts()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    setLoadingExtras(true)

    const unsubUsers = onSnapshot(
      query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5)),
      (snap) => {
        const next = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setRecentUsers(next)
        setLoadingExtras(false)
      },
      () => {
        setLoadingExtras(false)
      }
    )

    const unsubLawyers = onSnapshot(
      query(collection(db, 'lawyers'), orderBy('createdAt', 'desc'), limit(5)),
      (snap) => {
        const next = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setRecentLawyers(next)
      },
      () => {
        // ignore
      }
    )

    const unsubMessages = onSnapshot(
      query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'), limit(5)),
      (snap) => {
        const next = snap.docs.map(d => ({ id: d.id, ...d.data() }))
        setRecentMessages(next)
      },
      () => {
        // ignore
      }
    )

    return () => {
      unsubUsers()
      unsubLawyers()
      unsubMessages()
    }
  }, [])

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
        <h1 style={{ margin: 0, color: '#00d4ff', fontSize: '1.8rem', fontWeight: 800 }}>Admin Dashboard</h1>
        <p style={{ marginTop: 10, color: '#a9d9ff' }}>
          Admin-only area. You can manage all records.
        </p>

        <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Users</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{counts.users}</div>
          </div>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Lawyers</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{counts.lawyers}</div>
            <div style={{ marginTop: 8, color: '#a9d9ff', fontSize: 13 }}>
              <Link to="/services" style={{ color: '#00d4ff', fontWeight: 800, textDecoration: 'underline' }}>Open Services</Link>
            </div>
          </div>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Contact Requests</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{counts.messages}</div>
          </div>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#9fbccf', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4 }}>Records</div>
            <div style={{ marginTop: 6, color: '#cfefff', fontSize: 22, fontWeight: 900 }}>{counts.records}</div>
          </div>
        </div>

        <div style={{ marginTop: 14, background: 'rgba(0, 212, 255, 0.08)', border: '1px solid rgba(0, 212, 255, 0.18)', borderRadius: 12, padding: '0.9rem 1rem' }}>
          <div style={{ color: '#cfefff', fontWeight: 900 }}>Admin note</div>
          <div style={{ marginTop: 6, color: '#b7e9ff', fontSize: 13, lineHeight: 1.55 }}>
            Review contact requests for sensitive data before sharing externally. Keep role assignments limited to trusted accounts.
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          <div style={{ background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#cfefff', fontWeight: 700 }}>Recent users</div>
            <div style={{ marginTop: 10, color: '#9fbccf' }}>
              {loadingExtras ? 'Loading…' : recentUsers.length === 0 ? 'No users found.' : null}
            </div>
            {recentUsers.length > 0 && (
              <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                {recentUsers.map((u) => (
                  <div key={u.id} style={{ padding: '0.85rem 1rem', borderRadius: 10, border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(7,24,39,0.7)' }}>
                    <div style={{ color: '#cfefff', fontWeight: 800 }}>{u.displayName || `${u.firstName || ''} ${u.lastName || ''}`.trim() || 'User'}</div>
                    <div style={{ marginTop: 4, color: '#9fbccf', fontSize: 12 }}>{u.email || ''}</div>
                    <div style={{ marginTop: 4, color: '#a9d9ff', fontSize: 12 }}>role: {u.role || 'user'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#cfefff', fontWeight: 700 }}>Recent lawyer profiles</div>
            <div style={{ marginTop: 10, color: '#9fbccf' }}>
              {loadingExtras ? 'Loading…' : recentLawyers.length === 0 ? 'No lawyer profiles found.' : null}
            </div>
            {recentLawyers.length > 0 && (
              <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                {recentLawyers.map((l) => (
                  <div key={l.id} style={{ padding: '0.85rem 1rem', borderRadius: 10, border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(7,24,39,0.7)' }}>
                    <div style={{ color: '#cfefff', fontWeight: 800 }}>{l.name || 'Lawyer'}</div>
                    <div style={{ marginTop: 4, color: '#9fbccf', fontSize: 12 }}>{l.specialization || ''}</div>
                    <div style={{ marginTop: 6 }}>
                      <Link to={`/lawyer/${l.id}`} style={{ color: '#00d4ff', fontWeight: 800, textDecoration: 'underline', fontSize: 13 }}>Open details</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ color: '#cfefff', fontWeight: 700 }}>Recent contact requests</div>
            <div style={{ marginTop: 10, color: '#9fbccf' }}>
              {loadingExtras ? 'Loading…' : recentMessages.length === 0 ? 'No contact requests found.' : null}
            </div>
            {recentMessages.length > 0 && (
              <div style={{ marginTop: 10, display: 'grid', gap: 10 }}>
                {recentMessages.map((m) => (
                  <div key={m.id} style={{ padding: '0.85rem 1rem', borderRadius: 10, border: '1px solid rgba(0,212,255,0.18)', background: 'rgba(7,24,39,0.7)' }}>
                    <div style={{ color: '#cfefff', fontWeight: 800 }}>{m.inquiryType || 'Request'}</div>
                    <div style={{ marginTop: 4, color: '#9fbccf', fontSize: 12 }}>{m.email || ''}</div>
                    <div style={{ marginTop: 6, color: '#cfefff', fontSize: 13, lineHeight: 1.45 }}>
                      {(m.message || '').slice(0, 120)}{(m.message || '').length > 120 ? '…' : ''}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div style={{ marginTop: 12, background: 'rgba(255,68,68,0.12)', border: '1px solid rgba(255,68,68,0.2)', color: '#ffb3b3', padding: '0.75rem 1rem', borderRadius: 6 }}>
            {error}
          </div>
        )}

        <div style={{ marginTop: 18, background: '#071827', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ color: '#cfefff', fontWeight: 700 }}>All records</div>

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
                  <div style={{ display: 'grid', gap: 2 }}>
                    <div style={{ color: '#cfefff', fontWeight: 700 }}>
                      {r.title || '(untitled)'}
                    </div>
                    <div style={{ color: '#9fbccf', fontSize: 12 }}>
                      ownerId: {r.ownerId || '—'}
                    </div>
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

export default AdminDashboard
