import { getUserListings } from "@/features/jobs"
import { deferredLoader } from "@/lib/reactRouter"

export const loader = deferredLoader(() => {
  return { myListingsPromise: getUserListings() }
})
