import { useState, useEffect } from 'react'
import DashboardTemplate from '../components/templates/DashboardTemplate'
import Loader from '../components/atoms/Loader'
import ErrorMessage from '../components/atoms/ErrorMessage'
import employeeService from '../services/api/employeeService'
import attendanceService from '../services/api/attendanceService'
import leaveService from '../services/api/leaveService'
import { toast } from 'react-toastify'

function HomePage() {
  const [employees, setEmployees] = useState([])
  const [todayAttendance, setTodayAttendance] = useState([])
  const [recentLeaves, setRecentLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [employeesData, attendanceData, leavesData] = await Promise.all([
          employeeService.getAll(),
          attendanceService.getAll(),
          leaveService.getAll()
        ])

        setEmployees(employeesData || [])
        setTodayAttendance(attendanceData?.slice(0, 5) || [])
        setRecentLeaves(leavesData?.slice(0, 3) || [])
        
        // Show success message only if we got some data
        if (employeesData?.length > 0 || attendanceData?.length > 0 || leavesData?.length > 0) {
          toast.success('Dashboard data loaded successfully')
        }
      } catch (err) {
        const errorMessage = err?.message || 'Failed to load dashboard data'
        setError(errorMessage)
        toast.error(errorMessage)
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

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  const presentTodayCount = todayAttendance.length
  const pendingLeavesCount = recentLeaves.filter(leave => leave.status === 'pending').length

  return (
    <DashboardTemplate
      currentTime={currentTime}
      employeesCount={employees.length}
      todayAttendance={todayAttendance}
      recentLeaves={recentLeaves}
      presentTodayCount={presentTodayCount}
      pendingLeavesCount={pendingLeavesCount}
    />
  )
}

export default HomePage