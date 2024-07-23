import { useContext } from "react"
import { Context } from "../contexts/AuthProvider"

export function useAuth() {
  const value = useContext(Context)
  if (value == null) {
    throw new Error("Should be within Context.Provider")
  }

  return value
}
