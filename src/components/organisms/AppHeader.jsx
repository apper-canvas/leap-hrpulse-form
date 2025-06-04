import AppLogo from '../atoms/AppLogo'
import Avatar from '../atoms/Avatar'
import TimeDisplay from '../molecules/TimeDisplay'

const AppHeader = ({ currentTime }) => (
  <header className="bg-white/80 backdrop-blur-lg border-b border-surface-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <AppLogo />
        <div className="flex items-center space-x-4">
          <TimeDisplay currentTime={currentTime} />
          <Avatar />
        </div>
      </div>
    </div>
  </header>
)

export default AppHeader