import Input from '../atoms/Input'
import Text from '../atoms/Text'

const CheckboxField = ({ id, label, checked, onChange }) => (
  <div className="flex items-center space-x-3 pt-8">
    <Input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-primary border-surface-300 rounded focus:ring-primary/20"
    />
    <Text tag="label" htmlFor={id} className="text-sm font-medium text-surface-700">
      {label}
    </Text>
  </div>
)

export default CheckboxField