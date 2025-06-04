import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '../ApperIcon'
import leaveService from '../../services/api/leaveService'
import employeeService from '../../services/api/employeeService'
import AttendanceFeature from './AttendanceFeature'
import LeaveApplicationForm from './LeaveApplicationForm'
import TeamStatusSection from './TeamStatusSection'
import TabButton from '../atoms/TabButton'
import Card from '../atoms/Card'
import Text from '../atoms/Text'

const MainFeatureSection = () => {
  const [activeTab, setActiveTab] = useState('attendance')
  const [attendanceStatus, setAttendanceStatus] = useState('out')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [workHours, setWorkHours] = useState({ hours: 0, minutes: 0 })
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState(null)

  // Leave form state
  const [leaveForm, setLeaveForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    halfDay: false
  })
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      if (isCheckedIn && checkInTime) {
        const now = new Date()
        const diff = now - checkInTime
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setWorkHours({ hours, minutes })
      }
    }, 1000)

    loadData()

    return () => clearInterval(timer)
  }, [isCheckedIn, checkInTime])

  const loadData = async () => {
    setLoading(true)
    try {
      const [leavesData, employeesData] = await Promise.all([
        leaveService.getAll(),
        employeeService.getAll()
      ])
      setLeaves(leavesData || [])
      setEmployees(employeesData || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAttendance = () => {
    if (!isCheckedIn) {
      setIsCheckedIn(true)
      setCheckInTime(new Date())
      setAttendanceStatus('in')
      toast.success('Successfully checked in! Have a productive day!')
    } else {
      setIsCheckedIn(false)
      setCheckInTime(null)
      setAttendanceStatus('out')
      toast.success(`Checked out successfully! You worked for ${workHours.hours}h ${workHours.minutes}m today.`)
      setWorkHours({ hours: 0, minutes: 0 })
    }
  }

  const handleLeaveSubmit = async (e) => {
    e.preventDefault()
    if (!leaveForm.leaveType || !leaveForm.startDate || !leaveForm.reason) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const newLeave = {
        ...leaveForm,
        employeeId: 'EMP001',
        employeeName: 'Rajesh Kumar',
        status: 'pending',
        appliedDate: new Date().toISOString().split('T')[0],
        endDate: leaveForm.endDate || leaveForm.startDate
      }

      await leaveService.create(newLeave)
      toast.success('Leave application submitted successfully!')

      setLeaveForm({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        halfDay: false
      })

      await loadData()
    } catch (err) {
      toast.error('Failed to submit leave application')
    } finally {
      setLoading(false)
    }
  }

  const handleLeaveFormChange = (field, value) => {
    if (field === 'clear') {
      setLeaveForm({
        leaveType: '',
        startDate: '',
        endDate: '',
        reason: '',
        halfDay: false
      })
    } else {
      setLeaveForm(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'earned', label: 'Earned Leave' },
    { value: 'maternity', label: 'Maternity Leave' },
    { value: 'paternity', label: 'Paternity Leave' },
    { value: 'emergency', label: 'Emergency Leave' }
  ]

  const tabs = [
    { id: 'attendance', label: 'Attendance', icon: 'Clock' },
    { id: 'leave', label: 'Apply Leave', icon: 'Calendar' },
    { id: 'team', label: 'Team Status', icon: 'Users' }
  ]

  return (
    <Card className="p-6 md:p-8 shadow-soft">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <Text tag="h2" className="text-2xl font-bold text-surface-900 mb-4 sm:mb-0">Quick Actions</Text>
        <div className="flex bg-surface-100 rounded-2xl p-1">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              id={tab.id}
              label={tab.label}
              icon={tab.icon}
              activeTab={activeTab}
              onClick={setActiveTab}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'attendance' && (
          <AttendanceFeature
            currentTime={currentTime}
            isCheckedIn={isCheckedIn}
            workHours={workHours}
            checkInTime={checkInTime}
            handleAttendance={handleAttendance}
          />
        )}

        {activeTab === 'leave' && (
          <motion.div
            key="leave"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <LeaveApplicationForm
              leaveForm={leaveForm}
              handleLeaveFormChange={handleLeaveFormChange}
              handleLeaveSubmit={handleLeaveSubmit}
              loading={loading}
              leaveTypes={leaveTypes}
            />
          </motion.div>
        )}

        {activeTab === 'team' && (
          <TeamStatusSection employees={employees} />
        )}
      </AnimatePresence>
    </Card>
  )
}

export default MainFeatureSection