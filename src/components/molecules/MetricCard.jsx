import Card from '../atoms/Card'
import IconDisplay from '../atoms/IconDisplay'
import Text from '../atoms/Text'

const MetricCard = ({ title, value, iconName, bgColorClass, iconColorClass }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <Text className="text-surface-600 text-sm font-medium">{title}</Text>
        <Text tag="p" className="text-2xl font-bold text-surface-900">{value}</Text>
      </div>
      <IconDisplay iconName={iconName} bgColorClass={bgColorClass} iconColorClass={iconColorClass} />
    </div>
  </Card>
)

export default MetricCard