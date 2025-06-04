import Text from '../atoms/Text'

const TimeDisplay = ({ currentTime }) => {
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="hidden md:block text-right">
      <Text className="text-sm text-surface-600">{formatDate(currentTime)}</Text>
      <Text tag="p" className="text-lg font-semibold text-surface-900">{formatTime(currentTime)}</Text>
    </div>
  )
}

export default TimeDisplay