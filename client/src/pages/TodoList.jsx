import { Await, defer, useLoaderData } from "react-router-dom"
import { getTodos } from "../api/todos"
import { TodoItem } from "../components/TodoItem"
import { Suspense } from "react"

function TodoList() {
  const { todosPromise } = useLoaderData()

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        <Suspense fallback={<TodosFallback />}>
          <Await resolve={todosPromise}>
            {(todos) =>
              todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
            }
          </Await>
        </Suspense>
      </ul>
    </>
  )
}

function TodosFallback() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <div className="skeleton" style={{ width: "15em" }}></div>
        </li>
      ))}
    </>
  )
}

function loader({ request: { signal } }) {
  return defer({ todosPromise: getTodos({ signal }) })
}

export const todoListRoute = {
  loader,
  element: <TodoList />,
}
