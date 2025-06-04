import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AuthHeader from '../components/organisms/AuthHeader'
import DocumentSection from '../components/organisms/DocumentSection'
import RequestSection from '../components/organisms/RequestSection'
import employeeService from '../services/api/employeeService'
import { FileText, MessageSquare, User, Settings } from 'lucide-react'

function SelfServicePortal() {
  const [activeTab, setActiveTab] = useState('documents')

  const tabs = [
    { id: 'documents', label: 'My Documents', icon: FileText },
    { id: 'requests', label: 'Requests', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'documents':
        return <DocumentSection />
      case 'requests':
        return <RequestSection />
      case 'profile':
        return <ProfileSection />
      case 'settings':
        return <SettingsSection />
      default:
        return <DocumentSection />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <AuthHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 mb-2">
            Employee Self-Service Portal
          </h1>
          <p className="text-surface-600 dark:text-surface-400">
            Manage your documents, submit requests, and update your information
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="portal-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`portal-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 md:p-8">
          {renderTabContent()}
        </div>
      </main>
    </div>
  )
}

// Profile Section Component
function ProfileSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
        My Profile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="auth-input"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              defaultValue="EMP001"
              className="auth-input"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Department
            </label>
            <input
              type="text"
              defaultValue="Engineering"
              className="auth-input"
              readOnly
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="john.doe@company.com"
              className="auth-input"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Designation
            </label>
            <input
              type="text"
              defaultValue="Senior Developer"
              className="auth-input"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Joining Date
            </label>
            <input
              type="text"
              defaultValue="2022-01-15"
              className="auth-input"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Settings Section Component
function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
        Account Settings
      </h2>
      <div className="space-y-6">
        <div className="p-4 border border-surface-200 dark:border-surface-600 rounded-lg">
          <h3 className="font-medium text-surface-900 dark:text-surface-100 mb-2">
            Password Change
          </h3>
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
            Update your password to keep your account secure
          </p>
          <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            Change Password
          </button>
        </div>
        
        <div className="p-4 border border-surface-200 dark:border-surface-600 rounded-lg">
          <h3 className="font-medium text-surface-900 dark:text-surface-100 mb-2">
            Notification Preferences
          </h3>
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-4">
            Manage how you receive notifications
          </p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Email notifications</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" defaultChecked className="mr-2" />
              <span className="text-sm">Leave status updates</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Document reminders</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelfServicePortal