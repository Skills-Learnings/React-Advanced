import { getUserListings } from "@/features/jobs"
import { defer } from "react-router-dom"

export function loader() {
  const myListings = getUserListings()
  return defer({ myListingsPromise: myListings })
}