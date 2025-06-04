import { motion } from 'framer-motion'
import AppHeader from '../organisms/AppHeader'
import QuickStatsSection from '../organisms/QuickStatsSection'
import RecentActivitySection from '../organisms/RecentActivitySection'
import MainFeatureSection from '../organisms/MainFeatureSection'
import Text from '../atoms/Text'

const DashboardTemplate = ({
  currentTime,
  employeesCount,
  todayAttendance,
  recentLeaves,
  presentTodayCount,
  pendingLeavesCount
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      <AppHeader currentTime={currentTime} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Text tag="h2" className="text-2xl md:text-3xl font-bold text-surface-900 mb-2">
            Welcome back, Rajesh! 👋
          </Text>
          <Text className="text-surface-600">
            Here's what's happening with your HR dashboard today
          </Text>
        </motion.div>

        {/* Quick Stats */}
        <QuickStatsSection
          employeesCount={employeesCount}
          presentTodayCount={presentTodayCount}
          pendingLeavesCount={pendingLeavesCount}
        />

        {/* Main Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <MainFeatureSection />
        </motion.div>

        {/* Recent Activity */}
        <RecentActivitySection
          todayAttendance={todayAttendance}
          recentLeaves={recentLeaves}
        />
      </main>
    </div>
  )
}

export default DashboardTemplate