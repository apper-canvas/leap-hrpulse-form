import ApperIcon from '../ApperIcon'

const IconDisplay = ({ iconName, bgColorClass, iconColorClass, className = 'w-12 h-12' }) => (
  <div className={`${className} ${bgColorClass} rounded-xl flex items-center justify-center`}>
    <ApperIcon name={iconName} className={`h-6 w-6 ${iconColorClass}`} />
  </div>
)

export default IconDisplay