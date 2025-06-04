import { motion } from 'framer-motion'
import LiveClock from '../molecules/LiveClock'
import AttendanceButton from '../molecules/AttendanceButton'
import AttendanceStatus from '../molecules/AttendanceStatus'

const AttendanceFeature = ({
  currentTime,
  isCheckedIn,
  workHours,
  checkInTime,
  handleAttendance
}) => (
  <motion.div
    key="attendance"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="space-y-6"
  >
    <LiveClock currentTime={currentTime} />
    <AttendanceButton
      isCheckedIn={isCheckedIn}
      workHours={workHours}
      onClick={handleAttendance}
    />
    <AttendanceStatus
      isCheckedIn={isCheckedIn}
      checkInTime={checkInTime}
    />
  </motion.div>
)

export default AttendanceFeature