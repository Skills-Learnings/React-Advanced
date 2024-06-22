import { useState } from "react"
import ReactMemoExample from "./components/ReactMemoExample"
import Counter from "./Counter"
import { NameForm } from "./NameForm"

function App() {
  // React.Memo example
  /* return <ReactMemoExample /> */

  // Vitest basic example
  /* return <Counter /> */

  // React testing library example
  return (
    <>
      <Counter />
      <br/>
      <NameForm onSubmit={name => alert(name)}/>
    </>
  )


}

export default App
