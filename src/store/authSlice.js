import { createSlice } from '@reduxjs/toolkit'

// Mock user data for demonstration
const mockUsers = [
  {
    id: 'EMP001',
    email: 'john.doe@company.com',
    password: 'password123',
    name: 'John Doe',
    role: 'employee',
    department: 'Engineering',
    designation: 'Senior Developer'
  },
  {
    id: 'EMP002',
    email: 'admin@company.com', 
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    department: 'HR',
    designation: 'HR Manager'
  }
]

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
}

// Check for stored authentication on app load
const storedAuth = localStorage.getItem('hrpulse_auth')
if (storedAuth) {
  try {
    const authData = JSON.parse(storedAuth)
    if (authData.token && authData.user) {
      initialState.isAuthenticated = true
      initialState.user = authData.user
      initialState.token = authData.token
    }
  } catch (error) {
    localStorage.removeItem('hrpulse_auth')
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
      
      // Store in localStorage
      localStorage.setItem('hrpulse_auth', JSON.stringify({
        user: action.payload.user,
        token: action.payload.token
      }))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = action.payload
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      state.error = null
      state.loading = false
      
      // Remove from localStorage
      localStorage.removeItem('hrpulse_auth')
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions

// Async action for login
export const authenticateUser = (credentials) => async (dispatch) => {
  dispatch(loginStart())
  
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    )
    
    if (user) {
      const { password, ...userWithoutPassword } = user
      const token = `mock_token_${user.id}_${Date.now()}`
      
      dispatch(loginSuccess({
        user: userWithoutPassword,
        token
      }))
      
      return { success: true, user: userWithoutPassword }
    } else {
      dispatch(loginFailure('Invalid email or password'))
      return { success: false, error: 'Invalid email or password' }
    }
  } catch (error) {
    dispatch(loginFailure('Login failed. Please try again.'))
    return { success: false, error: 'Login failed. Please try again.' }
  }
}

export default authSlice.reducer