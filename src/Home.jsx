import { Await, defer, useLoaderData } from "react-router-dom"
import { wait } from "./wait"
import { Suspense } from "react"

function Home() {
  const { dataPromise } = useLoaderData()

  return (
    <h1>
      Home -{" "}
      <Suspense fallback="Loading">
        <Await resolve={dataPromise}>{(data) => <span>{data}</span>}</Await>
      </Suspense>
    </h1>
  )
}

function loader() {
  return defer({ dataPromise: wait("Loaded", 1000) })
}

export const homeRoute = { element: <Home />, loader }
