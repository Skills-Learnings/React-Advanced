import { Suspense } from "react"
import { Link, Outlet, useNavigation } from "react-router-dom"

export function Nav() {
  const { state } = useNavigation()
  return (
    <>
      <Link to="/">Home</Link>
      <br />
      <Link to="/store">Store</Link>
      <br />
      <Link to="/team">Team</Link>
      <br />
      {state === "loading" && "Loading..."}
      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
    </>
  )
}
