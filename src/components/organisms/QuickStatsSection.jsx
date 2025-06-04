import { motion } from 'framer-motion'
import MetricCard from '../molecules/MetricCard'

const QuickStatsSection = ({ employeesCount, presentTodayCount, pendingLeavesCount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
  >
    <MetricCard
      title="Total Employees"
      value={employeesCount}
      iconName="Users"
      bgColorClass="bg-primary/10"
      iconColorClass="text-primary"
    />
    <MetricCard
      title="Present Today"
      value={presentTodayCount}
      iconName="UserCheck"
      bgColorClass="bg-secondary/10"
      iconColorClass="text-secondary"
    />
    <MetricCard
      title="Pending Leaves"
      value={pendingLeavesCount}
      iconName="Calendar"
      bgColorClass="bg-accent/10"
      iconColorClass="text-accent"
    />
    <MetricCard
      title="This Month"
      value="₹2.4L"
      iconName="CreditCard"
      bgColorClass="bg-surface-100"
      iconColorClass="text-surface-600"
    />
  </motion.div>
)

export default QuickStatsSection