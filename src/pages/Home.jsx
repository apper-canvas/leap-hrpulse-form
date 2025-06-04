import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import employeeService from '../services/api/employeeService'
import attendanceService from '../services/api/attendanceService'
import leaveService from '../services/api/leaveService'

function Home() {
  const [employees, setEmployees] = useState([])
  const [todayAttendance, setTodayAttendance] = useState([])
  const [recentLeaves, setRecentLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      try {
        const [employeesData, attendanceData, leavesData] = await Promise.all([
          employeeService.getAll(),
          attendanceService.getAll(),
          leaveService.getAll()
        ])
        
        setEmployees(employeesData || [])
        setTodayAttendance(attendanceData?.slice(0, 5) || [])
        setRecentLeaves(leavesData?.slice(0, 3) || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboardData()

    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <ApperIcon name="AlertTriangle" className="h-16 w-16 mx-auto mb-4" />
          <p className="text-xl">Error loading dashboard: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-surface-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Users" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-surface-900">HRPulse</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-right">
                <p className="text-sm text-surface-600">{formatDate(currentTime)}</p>
                <p className="text-lg font-semibold text-surface-900">{formatTime(currentTime)}</p>
              </div>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-surface-900 mb-2">
            Welcome back, Rajesh! 👋
          </h2>
          <p className="text-surface-600">
            Here's what's happening with your HR dashboard today
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Total Employees</p>
                <p className="text-2xl font-bold text-surface-900">{employees.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Users" className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Present Today</p>
                <p className="text-2xl font-bold text-secondary">{todayAttendance.length}</p>
              </div>
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="UserCheck" className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">Pending Leaves</p>
                <p className="text-2xl font-bold text-accent">{recentLeaves.filter(leave => leave.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                <ApperIcon name="Calendar" className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200 hover:shadow-card transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-surface-600 text-sm font-medium">This Month</p>
                <p className="text-2xl font-bold text-surface-900">₹2.4L</p>
              </div>
              <div className="w-12 h-12 bg-surface-100 rounded-xl flex items-center justify-center">
                <ApperIcon name="CreditCard" className="h-6 w-6 text-surface-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Feature Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <MainFeature />
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Recent Attendance */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-surface-900">Today's Attendance</h3>
              <ApperIcon name="Clock" className="h-5 w-5 text-surface-600" />
            </div>
            <div className="space-y-4">
              {todayAttendance.length > 0 ? (
                todayAttendance.map((attendance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900">{attendance.employeeName || `Employee ${attendance.employeeId}`}</p>
                        <p className="text-sm text-surface-600">{attendance.checkIn || '09:00 AM'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-secondary">Present</p>
                      <p className="text-xs text-surface-600">{attendance.workHours || '8h 30m'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-surface-600">
                  <ApperIcon name="Calendar" className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No attendance records for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Leave Requests */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-surface-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-surface-900">Recent Leave Requests</h3>
              <ApperIcon name="Calendar" className="h-5 w-5 text-surface-600" />
            </div>
            <div className="space-y-4">
              {recentLeaves.length > 0 ? (
                recentLeaves.map((leave, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <ApperIcon name="User" className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-surface-900">{leave.employeeName || `Employee ${leave.employeeId}`}</p>
                        <p className="text-sm text-surface-600">{leave.leaveType || 'Casual Leave'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        leave.status === 'approved' ? 'bg-secondary/10 text-secondary' :
                        leave.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-accent/10 text-accent'
                      }`}>
                        {leave.status || 'pending'}
                      </span>
                      <p className="text-xs text-surface-600 mt-1">{leave.startDate || 'Today'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-surface-600">
                  <ApperIcon name="FileText" className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No recent leave requests</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Home