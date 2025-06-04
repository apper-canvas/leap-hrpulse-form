import { useState } from 'react'
import { toast } from 'react-toastify'
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Send,
  Calendar,
  User,
  FileText
} from 'lucide-react'

function RequestSection() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Leave Request',
      subject: 'Annual Leave - Family Wedding',
      description: 'Requesting 3 days leave for family wedding',
      status: 'approved',
      submittedDate: '2024-01-10',
      responseDate: '2024-01-11',
      response: 'Leave approved. Enjoy the celebration!'
    },
    {
      id: 2,
      type: 'Document Request',
      subject: 'Experience Letter Request',
      description: 'Need experience letter for visa application',
      status: 'pending',
      submittedDate: '2024-01-15',
      responseDate: null,
      response: null
    },
    {
      id: 3,
      type: 'IT Support',
      subject: 'Laptop Issue - Slow Performance',
      description: 'My laptop has been running very slow for the past week',
      status: 'in_progress',
      submittedDate: '2024-01-12',
      responseDate: '2024-01-13',
      response: 'IT team is looking into this. Will update soon.'
    }
  ])

  const [showNewRequestForm, setShowNewRequestForm] = useState(false)
  const [newRequest, setNewRequest] = useState({
    type: '',
    subject: '',
    description: '',
    priority: 'medium'
  })

  const requestTypes = [
    'Leave Request',
    'Document Request',
    'IT Support',
    'Salary Inquiry',
    'Benefits Inquiry',
    'Training Request',
    'Other'
  ]

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-blue-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-red-600' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitRequest = (e) => {
    e.preventDefault()
    
    if (!newRequest.type || !newRequest.subject || !newRequest.description) {
      toast.error('Please fill in all required fields')
      return
    }

    const request = {
      id: requests.length + 1,
      ...newRequest,
      status: 'pending',
      submittedDate: new Date().toISOString().split('T')[0],
      responseDate: null,
      response: null
    }

    setRequests(prev => [request, ...prev])
    setNewRequest({
      type: '',
      subject: '',
      description: '',
      priority: 'medium'
    })
    setShowNewRequestForm(false)
    toast.success('Request submitted successfully!')
  }

  const cancelRequest = (id) => {
    setRequests(prev => prev.filter(req => req.id !== id))
    toast.success('Request cancelled successfully')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-surface-900 dark:text-surface-100">
            My Requests
          </h2>
          <p className="text-surface-600 dark:text-surface-400">
            Submit and track your requests to HR, IT, and other departments
          </p>
        </div>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {/* New Request Form */}
      {showNewRequestForm && (
        <div className="bg-surface-50 dark:bg-surface-700 rounded-xl p-6">
          <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-4">
            Submit New Request
          </h3>
          
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Request Type *
                </label>
                <select
                  name="type"
                  value={newRequest.type}
                  onChange={handleInputChange}
                  className="auth-input"
                  required
                >
                  <option value="">Select request type</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newRequest.priority}
                  onChange={handleInputChange}
                  className="auth-input"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={newRequest.subject}
                onChange={handleInputChange}
                className="auth-input"
                placeholder="Brief description of your request"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={newRequest.description}
                onChange={handleInputChange}
                rows={4}
                className="auth-input"
                placeholder="Provide detailed information about your request"
                required
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowNewRequestForm(false)
                  setNewRequest({
                    type: '',
                    subject: '',
                    description: '',
                    priority: 'medium'
                  })
                }}
                className="px-6 py-2 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-lg hover:bg-surface-50 dark:hover:bg-surface-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Requests List */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100">
          Request History ({requests.length})
        </h3>

        {requests.map((request) => (
          <div key={request.id} className="bg-white dark:bg-surface-800 rounded-xl p-6 shadow-card border border-surface-200 dark:border-surface-600">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {request.type}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1 capitalize">{request.status.replace('_', ' ')}</span>
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-2">
                  {request.subject}
                </h4>
                <p className="text-surface-600 dark:text-surface-400 mb-3">
                  {request.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-surface-500 dark:text-surface-400">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Submitted: {new Date(request.submittedDate).toLocaleDateString()}
                  </span>
                  {request.responseDate && (
                    <span className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Responded: {new Date(request.responseDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
              
              {request.status === 'pending' && (
                <button
                  onClick={() => cancelRequest(request.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>

            {/* Response */}
            {request.response && (
              <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-700 rounded-lg border-l-4 border-primary">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm font-medium text-surface-900 dark:text-surface-100">
                    HR Response
                  </span>
                </div>
                <p className="text-surface-700 dark:text-surface-300">
                  {request.response}
                </p>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-surface-900 dark:text-surface-100 mb-2">
              No Requests Yet
            </h3>
            <p className="text-surface-600 dark:text-surface-400">
              Submit your first request using the button above
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestSection