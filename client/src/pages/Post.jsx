import { Await, defer, Link, useLoaderData } from "react-router-dom"
import { getComments } from "../api/comments"
import { getPost } from "../api/posts"
import { getUser } from "../api/users"
import { Suspense } from "react"

function Post() {
  const { commentsPromise, postPromise, userPromise } = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        <Suspense
          fallback={<div className="skeleton" style={{ width: "15em" }}></div>}
        >
          <Await resolve={postPromise}>{(post) => post.title}</Await>
        </Suspense>
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: {" "}
        <Suspense
          fallback={
            <div
              className="skeleton"
              style={{ width: "15em", display: "inline-block" }}
            ></div>
          }
        >
          <Await resolve={userPromise}>
            {(user) => <Link to={`/users/${user.id}`}>{user.name}</Link>}
          </Await>
        </Suspense>
      </span>
      <div>
        <Suspense
          fallback={
            <>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
              <div className="skeleton"></div>
            </>
          }
        >
          <Await resolve={postPromise}>{(post) => post.body}</Await>
        </Suspense>
      </div>
      <h3 className="mt-4 mb-2">Comments</h3>
      {
        <div className="card-stack">
          <Suspense fallback={<CommentsFallback />}>
            <Await resolve={commentsPromise}>
              {(comments) =>
                comments.map((comment) => (
                  <div key={comment.id} className="card">
                    <div className="card-body">
                      <div className="text-sm mb-1">{comment.email}</div>
                      {comment.body}
                    </div>
                  </div>
                ))
              }
            </Await>
          </Suspense>
          {}
        </div>
      }
    </>
  )
}

function CommentsFallback() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="card">
          <div className="card-body">
            <div className="text-sm mb-1">
              <div className="skeleton" style={{ width: "15em" }}></div>
            </div>
            <div className="skeleton"></div>
            <div className="skeleton"></div>
          </div>
        </div>
      ))}
    </>
  )
}
async function loader({ request: { signal }, params: { postId } }) {
  const comments = getComments(postId, { signal })
  const post = getPost(postId, { signal })

  return defer({
    commentsPromise: comments,
    postPromise: post,
    userPromise: post.then(post => getUser(post.userId, { signal })),
  })
}

export const postRoute = {
  loader,
  element: <Post />,
}
