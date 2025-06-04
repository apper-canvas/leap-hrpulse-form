import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'

const AttendanceStatus = ({ isCheckedIn, checkInTime }) => {
  const formatTime = (date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })

  return (
    <div className="text-center">
      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
        isCheckedIn
          ? 'bg-secondary/10 text-secondary'
          : 'bg-surface-100 text-surface-600'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          isCheckedIn ? 'bg-secondary animate-pulse' : 'bg-surface-400'
        }`}></div>
        <Text tag="span" className="font-medium">
          {isCheckedIn ? 'Currently Checked In' : 'Not Checked In'}
        </Text>
      </div>
      {checkInTime && (
        <Text className="text-sm text-surface-600 mt-2">
          Checked in at {formatTime(checkInTime)}
        </Text>
      )}
    </div>
  )
}

export default AttendanceStatus