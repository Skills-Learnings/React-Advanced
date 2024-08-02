import { getJobListing } from "@/features/jobs"
import { deferredLoader } from "@/lib/reactRouter"

export const loader = deferredLoader(({ params: { id } }) => {
  if (typeof id !== "string") throw new Response("Not Found", { status: 404 })

  return { listingPromise: getJobListing(id), id }
})
