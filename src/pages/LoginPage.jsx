import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Lock, Mail, Eye, EyeOff, Building2 } from 'lucide-react'
import { authenticateUser, clearError } from '../store/authSlice'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Input'
import Loader from '../components/atoms/Loader'

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const dispatch = useDispatch()
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth)
  const location = useLocation()

  const from = location.state?.from?.pathname || '/self-service'

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearError())
    }
  }, [error, dispatch])

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  const validateForm = () => {
    const errors = {}

    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the form errors')
      return
    }

    const result = await dispatch(authenticateUser(formData))
    
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (loading) {
    return <Loader />
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-surface-600 dark:text-surface-400">
            Sign in to access your self-service portal
          </p>
        </div>

        {/* Login Form */}
        <div className="auth-form">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`auth-input pl-11 ${formErrors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
              </div>
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-surface-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`auth-input pl-11 pr-11 ${formErrors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-surface-400 hover:text-surface-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="auth-button"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg">
            <p className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Demo Credentials:
            </p>
            <div className="text-xs text-surface-600 dark:text-surface-400 space-y-1">
              <p><strong>Employee:</strong> john.doe@company.com / password123</p>
              <p><strong>Admin:</strong> admin@company.com / admin123</p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link 
              to="/dashboard"
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage