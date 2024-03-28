import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/auth/check', { credentials: 'include' })
        const { user } = await res.json()
        setAuthUser(user) // null or authenticated user object
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    checkUserLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  return useContext(AuthContext)
}
