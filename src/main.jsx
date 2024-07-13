import React, { lazy } from "react"
import ReactDOM from "react-dom/client"
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import { Nav } from "./Nav"
import { homeRoute } from "./Home"
import { storeRoute } from "./Store"
import { wait } from "./wait"

const Team = lazy(() => wait(import("./Team"), 1000))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<Nav />}>
      <Route index={true} {...homeRoute} />
      <Route path="/store" {...storeRoute} />
      <Route path="/team" element={<Team />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
