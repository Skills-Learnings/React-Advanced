import { useState } from "react"

export default function useCount(initialCount) {
  const [count, setCount] = useState(initialCount)

  const incrementCount = () => {
    setCount((c) => c + 1)
  }

  const decrementCount = () => {
    setCount((c) => c - 1)
  }

  return { count, incrementCount, decrementCount }
}
