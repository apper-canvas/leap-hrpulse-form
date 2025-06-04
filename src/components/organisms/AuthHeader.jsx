import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LogOut, User, Settings, Building2 } from 'lucide-react'
import { logout } from '../../store/authSlice'

function AuthHeader() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    toast.success('Logged out successfully')
  }

  return (
    <header className="bg-white dark:bg-surface-800 shadow-soft border-b border-surface-200 dark:border-surface-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link to="/self-service" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-light rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-surface-900 dark:text-surface-100">
              HRPulse
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/self-service"
              className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors"
            >
              Self Service
            </Link>
            <Link 
              to="/dashboard"
              className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-surface-900 dark:text-surface-100">
                {user?.name}
              </p>
              <p className="text-xs text-surface-500 dark:text-surface-400">
                {user?.designation}
              </p>
            </div>

            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-light rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="p-2 text-surface-600 dark:text-surface-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AuthHeader