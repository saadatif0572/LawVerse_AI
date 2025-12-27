import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'

const AuthContext = createContext({
  user: null,
  role: null,
  loading: true,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribeUserDoc = null

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (unsubscribeUserDoc) {
        unsubscribeUserDoc()
        unsubscribeUserDoc = null
      }

      setUser(firebaseUser)
      setRole(null)

      if (!firebaseUser) {
        setLoading(false)
        return
      }

      setLoading(true)
      const userRef = doc(db, 'users', firebaseUser.uid)
      unsubscribeUserDoc = onSnapshot(
        userRef,
        (snap) => {
          const data = snap.data()
          setRole(data?.role ?? 'user')
          setLoading(false)
        },
        () => {
          setRole(null)
          setLoading(false)
        }
      )
    })

    return () => {
      if (unsubscribeUserDoc) unsubscribeUserDoc()
      unsubscribeAuth()
    }
  }, [])

  const value = useMemo(() => ({ user, role, loading }), [user, role, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
