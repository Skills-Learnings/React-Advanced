import { useAuth } from "@/features/auth"
import React, { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { LoadingSpinner } from "../ui/LoadingSpinner"

type PrivatePageProps = {
  children: ReactNode
}

export function PrivatePage({ children }: PrivatePageProps) {
  const { user, isLoadingUser } = useAuth()
  const location = useLocation()

  if (isLoadingUser) return <LoadingSpinner className="w-24 h-24" />

  if (user == null) return <Navigate to="/login" replace state={{ location }} />

  return children
}
