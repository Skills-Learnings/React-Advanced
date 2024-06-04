import { useReducer } from "react"

type State = {
  count: number
}

type Action =
  | {
      type: "INCREMENT"
      increaseBy: number
    }
  | {
      type: "DECREMENT"
      decreaseBy: number
    }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.increaseBy }
    case "DECREMENT":
      return { ...state, count: state.count - action.decreaseBy }
    default:
      throw new Error("sdf")
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })

  return (
    <div>
      <button onClick={() => dispatch({ type: "DECREMENT", decreaseBy: 1 })}>
        -
      </button>
      {state.count}
      <button onClick={() => dispatch({ type: "INCREMENT", increaseBy: 1 })}>
        +
      </button>
    </div>
  )
}
