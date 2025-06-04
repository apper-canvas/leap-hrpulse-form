import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary', 'secondary', 'ghost'
  disabled = false,
  loading = false,
  iconName,
  className = '',
  motionProps = {}
}) => {
  const baseClasses = 'py-3 px-6 rounded-xl font-medium transition-all duration-300'
  let variantClasses = ''

  switch (variant) {
    case 'primary':
      variantClasses = 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed'
      break
    case 'secondary':
      variantClasses = 'bg-gradient-to-r from-secondary to-secondary-dark text-white hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed'
      break
    case 'ghost':
      variantClasses = 'border border-surface-200 text-surface-600 hover:bg-surface-50'
      break
    case 'danger':
      variantClasses = 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-neu-light disabled:opacity-50 disabled:cursor-not-allowed'
      break
    default:
      variantClasses = 'bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-card disabled:opacity-50 disabled:cursor-not-allowed'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center space-x-2 ${baseClasses} ${variantClasses} ${className}`}
      {...motionProps}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {iconName && <ApperIcon name={iconName} className="h-5 w-5" />}
          <span>{children}</span>
        </>
      )}
    </motion.button>
  )
}

export default Button