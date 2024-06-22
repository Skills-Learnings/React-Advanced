import React, { useState } from 'react'
import { CounterMemo } from './CounterMemo'

export default function ReactMemoExample() {
  const [name, setName] = useState("")
  const [initialCount, setInitialCount] = useState(0)

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setInitialCount(c => c + 1)}>+</button>
      <br />
      <CounterMemo initialCount={initialCount} otherProp="Hi Sahil"/>
    </>
  )
}
