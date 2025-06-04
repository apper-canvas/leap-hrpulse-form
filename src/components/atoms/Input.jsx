const Input = ({ label, type = 'text', value, onChange, min, placeholder, required = false, rows = 1, className = '', id }) => {
  const InputElement = type === 'textarea' ? 'textarea' : 'input'

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-surface-700 mb-2">
          {label} {required && '*'}
        </label>
      )}
      <InputElement
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 ${type === 'textarea' ? 'resize-none' : ''} ${className}`}
      />
    </div>
  )
}

export default Input