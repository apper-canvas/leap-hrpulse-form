import ApperIcon from '../ApperIcon'

const TabButton = ({ id, label, icon, activeTab, onClick }) => (
  <button
    key={id}
    onClick={() => onClick(id)}
    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
      activeTab === id
        ? 'bg-white text-primary shadow-card'
        : 'text-surface-600 hover:text-surface-900'
    }`}
  >
    <ApperIcon name={icon} className="h-4 w-4" />
    <span className="hidden sm:inline">{label}</span>
  </button>
)

export default TabButton