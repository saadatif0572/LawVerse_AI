import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="px-6 py-8 text-cyan-200">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
