import Text from '../atoms/Text'

const LiveClock = ({ currentTime }) => {
  const formatTime = (date) => date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  const formatDate = (date) => date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
      <Text tag="div" className="text-4xl md:text-5xl font-bold text-surface-900 mb-2">
        {formatTime(currentTime)}
      </Text>
      <Text tag="div" className="text-surface-600 text-lg">
        {formatDate(currentTime)}
      </Text>
    </div>
  )
}

export default LiveClock