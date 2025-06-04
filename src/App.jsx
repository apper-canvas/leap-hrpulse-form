import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SelfServicePortal from './pages/SelfServicePortal'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800">
      <Routes>
        <Route path="/" element={isAuthenticated ? <SelfServicePortal /> : <HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<HomePage />} />
        <Route 
          path="/self-service" 
          element={
            <ProtectedRoute>
              <SelfServicePortal />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
        toastClassName="toast-custom"
        bodyClassName="toast-body"
        progressClassName="toast-progress"
      />
    </div>
  )
}

export default App