import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import http from '../api/http'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    setLoading(false)
  }, [])

  const login = async (payload) => {
    const response = await http.post('/login', payload)

    const authToken = response.data?.data?.token
    const authUser = response.data?.data?.user

    if (authToken) {
      localStorage.setItem('token', authToken)
      setToken(authToken)
    }

    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser))
      setUser(authUser)
    }

    return response
  }

  const register = async (payload) => {
    const response = await http.post('/register', payload)

    const authToken = response.data?.data?.token
    const authUser = response.data?.data?.user

    if (authToken) {
      localStorage.setItem('token', authToken)
      setToken(authToken)
    }

    if (authUser) {
      localStorage.setItem('user', JSON.stringify(authUser))
      setUser(authUser)
    }

    return response
  }

  const logout = async () => {
    try {
      await http.post('/logout')
    } catch (error) {
      // logout local mesmo se a API falhar
    }

    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(() => {
    return {
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }
  }, [user, token, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }

  return context
}