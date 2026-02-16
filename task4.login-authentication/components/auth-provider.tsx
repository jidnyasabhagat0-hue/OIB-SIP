"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface User {
  email: string
  name: string
}

interface RegisteredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (
    name: string,
    email: string,
    password: string,
  ) => { success: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = "auth_users"
const SESSION_KEY = "auth_session"

function getStoredUsers(): RegisteredUser[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(USERS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function storeUsers(users: RegisteredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function getSession(): User | null {
  if (typeof window === "undefined") return null
  try {
    const data = localStorage.getItem(SESSION_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function setSession(user: User | null) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const session = getSession()
    setUser(session)
    setIsLoading(false)
  }, [])

  const register = useCallback(
    (
      name: string,
      email: string,
      password: string,
    ): { success: boolean; error?: string } => {
      const users = getStoredUsers()
      const normalizedEmail = email.toLowerCase().trim()

      if (users.some((u) => u.email === normalizedEmail)) {
        return { success: false, error: "An account with this email already exists." }
      }

      if (password.length < 6) {
        return {
          success: false,
          error: "Password must be at least 6 characters.",
        }
      }

      const newUser: RegisteredUser = {
        name: name.trim(),
        email: normalizedEmail,
        password,
      }
      storeUsers([...users, newUser])

      const sessionUser: User = { name: newUser.name, email: newUser.email }
      setSession(sessionUser)
      setUser(sessionUser)

      return { success: true }
    },
    [],
  )

  const login = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const users = getStoredUsers()
      const normalizedEmail = email.toLowerCase().trim()
      const found = users.find(
        (u) => u.email === normalizedEmail && u.password === password,
      )

      if (!found) {
        return { success: false, error: "Invalid email or password." }
      }

      const sessionUser: User = { name: found.name, email: found.email }
      setSession(sessionUser)
      setUser(sessionUser)

      return { success: true }
    },
    [],
  )

  const logout = useCallback(() => {
    setSession(null)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
