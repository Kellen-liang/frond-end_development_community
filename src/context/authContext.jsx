import { createContext, useState, useEffect } from "react"
import axios from "axios";
export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (data) => {
    const res = await axios.post('http://localhost:3002/api/user/login', data)
    if (res.data.status === 1) setCurrentUser(res.data.data)
    return res.data
  }

  const logout = async () => {
    await axios.post('http://localhost:3002/api/user/logout')
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
}