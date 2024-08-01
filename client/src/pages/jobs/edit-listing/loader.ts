import { getJobListing } from "@/features/jobs"
import { defer } from "react-router-dom"

export function loader({ params: { id } }) {
  if (typeof id !== "string") throw new Response("Not Found", { status: 404 })

  return defer({ listingPromise: getJobListing(id), id })
}
