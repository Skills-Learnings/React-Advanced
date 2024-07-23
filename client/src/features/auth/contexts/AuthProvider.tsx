import { createContext, ReactNode, useEffect, useState } from "react"
import { User } from "../constants/types"
import {
  getCurrentUser,
  loginService,
  logoutService,
  signupService,
} from "../services/authentication"
import { useLocation, useNavigate } from "react-router-dom"
import LogoutModal from "../components/LogoutModal"

type Context = {
  signUp: (email: string, password: string) => Promise<void>
  logIn: (email: string, password: string) => Promise<void>
  logOut: () => void
  isLoggedIn: boolean
  user: User | undefined
}
export const Context = createContext<Context | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCurrentUser().then(setUser)
  }, [])

  function signUp(email: string, password: string) {
    return signupService(email, password).then((user) => {
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function logIn(email: string, password: string) {
    return loginService(email, password).then((user) => {
      setUser(user)
      navigate(location.state?.location ?? "/")
    })
  }

  function logOut() {
    setIsLogoutModalOpen(true)
    return logoutService()
      .then(() => setUser(undefined))
      .finally(() => setIsLogoutModalOpen(false))
  }

  return (
    <Context.Provider
      value={{ signUp, logIn, logOut, user, isLoggedIn: user != null }}
    >
      {children}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
      />
    </Context.Provider>
  )
}
