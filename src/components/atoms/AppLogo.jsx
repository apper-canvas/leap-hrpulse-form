import ApperIcon from '../ApperIcon'

const AppLogo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
      <ApperIcon name="Users" className="h-5 w-5 text-white" />
    </div>
    <h1 className="text-xl font-bold text-surface-900">HRPulse</h1>
  </div>
)

export default AppLogo