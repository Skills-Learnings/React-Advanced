import { Outlet } from "react-router-dom"

export default function AuthLayout({}) {
  return (
    <div className="flex justify-center items-center h-full">
      <Outlet />
    </div>
  )
}
