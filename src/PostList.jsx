import { useEffect, useState } from "react"

export default function PostList() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://example.com/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
      })
  }, [])

  return (
    <ol>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ol>
  )
}
