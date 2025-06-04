import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const BalanceCard = ({ title, value, icon, bgColor, iconColor }) => (
  <div className={`bg-gradient-to-r ${bgColor} rounded-xl p-4`}>
    <div className="flex items-center justify-between">
      <div>
        <Text className="text-sm text-surface-600">{title}</Text>
        <Text tag="p" className={`text-2xl font-bold ${iconColor}`}>{value}</Text>
      </div>
      <ApperIcon name={icon} className={`h-8 w-8 ${iconColor}`} />
    </div>
  </div>
)

export default BalanceCard