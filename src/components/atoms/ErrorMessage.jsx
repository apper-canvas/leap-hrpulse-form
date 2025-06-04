import ApperIcon from '../ApperIcon'

const ErrorMessage = ({ message }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-red-500 text-center">
      <ApperIcon name="AlertTriangle" className="h-16 w-16 mx-auto mb-4" />
      <p className="text-xl">Error loading dashboard: {message}</p>
    </div>
  </div>
)

export default ErrorMessage