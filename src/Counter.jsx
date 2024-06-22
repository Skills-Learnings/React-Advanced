import React from "react"
import useCount from "./useCount"

export default function Counter({ initialCount = 0 }) {
  const { count, incrementCount, decrementCount } = useCount(initialCount)

  return (
    <div>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>
    </div>
  )
}
