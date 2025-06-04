import { motion } from 'framer-motion'
import ApperIcon from '../ApperIcon'
import Button from '../atoms/Button'

const AttendanceButton = ({ isCheckedIn, workHours, onClick }) => (
  <div className="flex flex-col items-center space-y-4">
    <Button
      onClick={onClick}
      variant={isCheckedIn ? 'danger' : 'secondary'}
      className={`w-48 h-48 rounded-full shadow-neu-light ${isCheckedIn ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-secondary to-secondary-dark'}`}
      motionProps={{ whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } }}
    >
      <motion.div
        animate={{ rotate: isCheckedIn ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <ApperIcon name={isCheckedIn ? 'LogOut' : 'LogIn'} className="h-12 w-12 mb-2" />
      </motion.div>
      <span className="text-xl">{isCheckedIn ? 'Check Out' : 'Check In'}</span>
      {isCheckedIn && (
        <div className="text-sm mt-1 opacity-90">
          {workHours.hours}h {workHours.minutes}m
        </div>
      )}
    </Button>
  </div>
)

export default AttendanceButton