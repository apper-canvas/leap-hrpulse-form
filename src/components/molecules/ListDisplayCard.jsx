import ApperIcon from '../ApperIcon'
import Card from '../atoms/Card'
import Text from '../atoms/Text'

const ListDisplayCard = ({ title, icon, items, renderItem, emptyMessage, emptyIcon }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
      <Text tag="h3" className="text-lg font-semibold text-surface-900">{title}</Text>
      <ApperIcon name={icon} className="h-5 w-5 text-surface-600" />
    </div>
    <div className="space-y-4">
      {items.length > 0 ? (
        items.map(renderItem)
      ) : (
        <div className="text-center py-8 text-surface-600">
          <ApperIcon name={emptyIcon} className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <Text>{emptyMessage}</Text>
        </div>
      )}
    </div>
  </Card>
)

export default ListDisplayCard