import { useRef } from "react"

export default function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null)
  const value = useRef(0)

  value.current = 16

  return <input ref={inputRef} />
}
