import { useState } from "react"

export default function Input() {
  const [value, setValue] = useState<string>()
  return (
    <input type="text" value={value} onChange={e => setValue(e.target.value)} />
  )
}
