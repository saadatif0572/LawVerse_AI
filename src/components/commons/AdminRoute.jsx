import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useAuth()
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

  if (role !== 'admin') {
    return <Navigate to="/user-dashboard" replace />
  }

  return children
}

export default AdminRoute
