import {  useUsers } from "./UseContextExample"

export default function Users() {
  const { users } = useUsers()

  return (
    <ul>
      { users.map(user => {
        return <li key={user.id}>{user.name}</li>
      }) }
    </ul>
  )
}
