import ApperIcon from '../ApperIcon'

const Avatar = ({ iconName = "User", className = "" }) => (
  <div className={`w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center ${className}`}>
    <ApperIcon name={iconName} className="h-4 w-4 text-white" />
  </div>
)

export default Avatar