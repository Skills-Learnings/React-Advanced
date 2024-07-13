import { Await, useLoaderData } from "react-router-dom"
import { wait } from "./wait"
import { Suspense } from "react"

function Store() {
  const { productCountPromise, categoryPromise } = useLoaderData()

  return (
    <>
      <h1>Story</h1>
      <strong>Product Count: </strong>{" "}
      <Suspense fallback="Loading">
        <Await resolve={productCountPromise}>
          {(count) => <span>{count}</span>}
        </Await>
      </Suspense>
      <br />
      <strong>Category: </strong>{" "}
      <Suspense fallback="Loading">
        <Await resolve={categoryPromise}>
          {(category) => <span>{category}</span>}
        </Await>
      </Suspense>
    </>
  )
}

function loader() {
  const productCountPromise = wait(4, 1000)
  const categoryPromise = wait("Sports", 2000)

  return {
    productCountPromise,
    categoryPromise,
  }
}

export const storeRoute = { element: <Store />, loader }
