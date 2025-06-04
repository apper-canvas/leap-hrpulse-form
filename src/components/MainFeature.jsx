import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import leaveService from '../services/api/leaveService'
import employeeService from '../services/api/employeeService'

function MainFeature() {
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
    setLeaveForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
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
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-surface-200 shadow-soft">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-surface-900 mb-4 sm:mb-0">Quick Actions</h2>
        <div className="flex bg-surface-100 rounded-2xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-white text-primary shadow-card'
                  : 'text-surface-600 hover:text-surface-900'
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'attendance' && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Live Clock */}
            <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6">
              <div className="text-4xl md:text-5xl font-bold text-surface-900 mb-2">
                {formatTime(currentTime)}
              </div>
              <div className="text-surface-600 text-lg">
                {currentTime.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </div>
            </div>

            {/* Check In/Out Button */}
            <div className="flex flex-col items-center space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAttendance}
                className={`relative overflow-hidden w-48 h-48 rounded-full flex flex-col items-center justify-center text-white font-bold text-xl shadow-neu-light transition-all duration-500 ${
                  isCheckedIn
                    ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                    : 'bg-gradient-to-br from-secondary to-secondary-dark hover:from-secondary-dark hover:to-secondary'
                }`}
              >
                <motion.div
                  animate={{ rotate: isCheckedIn ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ApperIcon 
                    name={isCheckedIn ? 'LogOut' : 'LogIn'} 
                    className="h-12 w-12 mb-2" 
                  />
                </motion.div>
                <span>{isCheckedIn ? 'Check Out' : 'Check In'}</span>
                {isCheckedIn && (
                  <div className="text-sm mt-1 opacity-90">
                    {workHours.hours}h {workHours.minutes}m
                  </div>
                )}
              </motion.button>

              {/* Status Display */}
              <div className="text-center">
                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  isCheckedIn 
                    ? 'bg-secondary/10 text-secondary' 
                    : 'bg-surface-100 text-surface-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    isCheckedIn ? 'bg-secondary animate-pulse' : 'bg-surface-400'
                  }`}></div>
                  <span className="font-medium">
                    {isCheckedIn ? 'Currently Checked In' : 'Not Checked In'}
                  </span>
                </div>
                {checkInTime && (
                  <p className="text-sm text-surface-600 mt-2">
                    Checked in at {formatTime(checkInTime)}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'leave' && (
          <motion.div
            key="leave"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <form onSubmit={handleLeaveSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Leave Type *
                  </label>
                  <select
                    value={leaveForm.leaveType}
                    onChange={(e) => handleLeaveFormChange('leaveType', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    required
                  >
                    <option value="">Select leave type</option>
                    {leaveTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => handleLeaveFormChange('startDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => handleLeaveFormChange('endDate', e.target.value)}
                    min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                  />
                </div>

                <div className="flex items-center space-x-3 pt-8">
                  <input
                    type="checkbox"
                    id="halfDay"
                    checked={leaveForm.halfDay}
                    onChange={(e) => handleLeaveFormChange('halfDay', e.target.checked)}
                    className="w-5 h-5 text-primary border-surface-300 rounded focus:ring-primary/20"
                  />
                  <label htmlFor="halfDay" className="text-sm font-medium text-surface-700">
                    Half Day Leave
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Reason *
                </label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => handleLeaveFormChange('reason', e.target.value)}
                  rows={4}
                  placeholder="Please provide reason for leave..."
                  className="w-full px-4 py-3 rounded-xl border border-surface-200 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-white py-3 px-6 rounded-xl font-medium hover:shadow-card transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Send" className="h-5 w-5" />
                      <span>Submit Application</span>
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setLeaveForm({
                    leaveType: '',
                    startDate: '',
                    endDate: '',
                    reason: '',
                    halfDay: false
                  })}
                  className="px-6 py-3 rounded-xl border border-surface-200 text-surface-600 hover:bg-surface-50 transition-all duration-300"
                >
                  Clear Form
                </button>
              </div>
            </form>

            {/* Leave Balance Display */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-surface-200">
              <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600">Casual Leave</p>
                    <p className="text-2xl font-bold text-secondary">12</p>
                  </div>
                  <ApperIcon name="Coffee" className="h-8 w-8 text-secondary" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600">Sick Leave</p>
                    <p className="text-2xl font-bold text-accent">8</p>
                  </div>
                  <ApperIcon name="Heart" className="h-8 w-8 text-accent" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-surface-600">Earned Leave</p>
                    <p className="text-2xl font-bold text-primary">15</p>
                  </div>
                  <ApperIcon name="Award" className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {employees.length > 0 ? (
                employees.slice(0, 6).map((employee, index) => (
                  <div key={employee.employeeId || index} className="bg-surface-50 rounded-xl p-4 hover:shadow-card transition-all duration-300">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {employee.name?.charAt(0) || 'E'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-surface-900">
                          {employee.name || 'Employee Name'}
                        </h4>
                        <p className="text-sm text-surface-600">
                          {employee.designation || 'Software Engineer'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                          <span className="text-xs text-secondary font-medium">Online</span>
                        </div>
                        <p className="text-xs text-surface-600">
                          {employee.department || 'Engineering'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-surface-600">
                  <ApperIcon name="Users" className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>No team members found</p>
                </div>
              )}
            </div>

            {employees.length > 6 && (
              <div className="text-center">
                <button className="text-primary hover:text-primary-dark font-medium">
                  View All Team Members ({employees.length})
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature