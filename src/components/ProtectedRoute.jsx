import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import Loader from './atoms/Loader'

function ProtectedRoute({ children, requiredRole = null }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth)
  const location = useLocation()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/self-service" replace />
  }

  return children
}

export default ProtectedRoute