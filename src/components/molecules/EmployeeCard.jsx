import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const EmployeeCard = ({ employee }) => (
  <div className="bg-surface-50 rounded-xl p-4 hover:shadow-card transition-all duration-300">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {employee.name?.charAt(0) || 'E'}
        </span>
      </div>
      <div className="flex-1">
        <Text tag="h4" className="font-medium text-surface-900">
          {employee.name || 'Employee Name'}
        </Text>
        <Text className="text-sm text-surface-600">
          {employee.designation || 'Software Engineer'}
        </Text>
      </div>
      <div className="text-right">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
          <Text className="text-xs text-secondary font-medium">Online</Text>
        </div>
        <Text className="text-xs text-surface-600">
          {employee.department || 'Engineering'}
        </Text>
      </div>
    </div>
  </div>
)

export default EmployeeCard