import React, { memo, useState } from "react"

function Component({ initialCount, otherProp }) {
  const [value, setValue] = useState(initialCount)
  return (
    <>
      {otherProp}
      <button onClick={() => setValue((v) => v - 1)}>-</button>
      {value}
      <button onClick={() => setValue((v) => v + 1)}>+</button>
    </>
  )
}

export const CounterMemo = memo(Component, (prevProps, newProps) => {
  return prevProps.otherProp === newProps.otherProp
})
