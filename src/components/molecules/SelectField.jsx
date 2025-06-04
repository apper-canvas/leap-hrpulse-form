import Input from '../atoms/Input'
import Text from '../atoms/Text'

const SelectField = ({ label, value, onChange, options, required = false, id }) => (
  <div>
    <Text tag="label" htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2">
      {label} {required && '*'}
    </Text>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
      required={required}
    >
      <option value="">Select {label.toLowerCase()}</option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

export default SelectField