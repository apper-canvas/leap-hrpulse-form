import { motion } from 'framer-motion'
import ListDisplayCard from '../molecules/ListDisplayCard'
import ApperIcon from '../ApperIcon'
import Text from '../atoms/Text'
import StatusBadge from '../atoms/StatusBadge'

const RecentActivitySection = ({ todayAttendance, recentLeaves }) => {
  const renderAttendanceItem = (attendance, index) => (
    <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
          <ApperIcon name="User" className="h-4 w-4 text-primary" />
        </div>
        <div>
          <Text className="font-medium text-surface-900">{attendance.employeeName || `Employee ${attendance.employeeId}`}</Text>
          <Text className="text-sm text-surface-600">{attendance.checkIn || '09:00 AM'}</Text>
        </div>
      </div>
      <div className="text-right">
        <Text className="text-sm font-medium text-secondary">Present</Text>
        <Text className="text-xs text-surface-600">{attendance.workHours || '8h 30m'}</Text>
      </div>
    </div>
  )

const renderLeaveItem = (leave, index) => (
    <div key={leave?.Id || index} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
          <ApperIcon name="User" className="h-4 w-4 text-accent" />
        </div>
        <div>
          <Text className="font-medium text-surface-900">
            {leave?.employee_id || leave?.Name || `Employee ${leave?.Id || 'N/A'}`}
          </Text>
          <Text className="text-sm text-surface-600">{leave?.leave_type || 'Casual Leave'}</Text>
        </div>
      </div>
      <div className="text-right">
        <StatusBadge status={leave?.status} />
        <Text className="text-xs text-surface-600 mt-1">{leave?.start_date || 'Today'}</Text>
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <ListDisplayCard
        title="Today's Attendance"
        icon="Clock"
        items={todayAttendance}
        renderItem={renderAttendanceItem}
        emptyMessage="No attendance records for today"
        emptyIcon="Calendar"
      />

      <ListDisplayCard
        title="Recent Leave Requests"
        icon="Calendar"
        items={recentLeaves}
        renderItem={renderLeaveItem}
        emptyMessage="No recent leave requests"
        emptyIcon="FileText"
      />
    </motion.div>
  )
}

export default RecentActivitySection