import { Await, defer, useLoaderData } from "react-router-dom"
import { getPosts } from "../api/posts"
import { getTodos } from "../api/todos"
import { getUser } from "../api/users"
import { PostCard, PostCardSkeleton } from "../components/PostCard"
import { TodoItem } from "../components/TodoItem"
import { Suspense } from "react"

function User() {
  const { userPromise, postsPromise, todosPromise } = useLoaderData()

  return (
    <>
      <Suspense fallback={<UserFallback />}>
        <Await resolve={userPromise}>
          {(user) => (
            <>
              <h1 className="page-title">{user.name}</h1>
              <div className="page-subtitle">{user.email}</div>
              <div>
                <b>Company:</b> {user.company.name}
              </div>
              <div>
                <b>Website:</b> {user.website}
              </div>
              <div>
                <b>Address:</b> {user.address.street} {user.address.suite}{" "}
                {user.address.city} {user.address.zipcode}
              </div>
            </>
          )}
        </Await>
      </Suspense>

      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        <Suspense fallback={<PostListFallback />}>
          <Await resolve={postsPromise}>
            {(posts) =>
              posts.map((post) => <PostCard key={post.id} {...post} />)
            }
          </Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
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

function UserFallback() {
  return (
    <>
      <div className="skeleton" style={{ width: "15em" }}></div>
      <div className="page-subtitle">
        <div className="skeleton" style={{ width: "15em" }}></div>
      </div>
      <div>
        <b>Company:</b>{" "}
        <div
          className="skeleton"
          style={{ width: "15em", display: "inline-block" }}
        ></div>
      </div>
      <div>
        <b>Website:</b>{" "}
        <div
          className="skeleton"
          style={{ width: "15em", display: "inline-block" }}
        ></div>
      </div>
      <div>
        <b>Address:</b>{" "}
        <div
          className="skeleton"
          style={{ width: "15em", display: "inline-block" }}
        ></div>
      </div>
    </>
  )
}

function TodosFallback() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i}>
          <div className="skeleton" style={{ width: "15em" }}></div>
        </li>
      ))}
    </>
  )
}

function PostListFallback() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </>
  )
}

function loader({ request: { signal }, params: { userId } }) {
  const posts = getPosts({ signal, params: { userId } })
  const todos = getTodos({ signal, params: { userId } })
  const user = getUser(userId, { signal })

  return defer({ postsPromise: posts, todosPromise: todos, userPromise: user })
}

export const userRoute = {
  loader,
  element: <User />,
}
