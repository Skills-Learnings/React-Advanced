import type { ReactNode } from "react"

type ChildProps = {
  children?: ReactNode
}

export default function Child({ children }: ChildProps) {
  return <h1>{ children }</h1>
}
