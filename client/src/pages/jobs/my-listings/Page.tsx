import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { ListingSkeletonGrid, MyListingsGrid } from "@/features/jobs"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"

export function MyListingsPage() {
  const { myListingsPromise } = useDeferredLoaderData<typeof loader>()
  console.log(myListingsPromise)
  return (
    <>
      <PageHeader
        btnSection={
          <Button variant="outline" asChild>
            <Link to="/jobs/new" className="flex gap-1">
              Create Listing
            </Link>
          </Button>
        }
      >
        My Job Listings
      </PageHeader>
      {
        <Suspense fallback={<ListingSkeletonGrid />}>
          <Await resolve={myListingsPromise}>
            {(myListings) => <MyListingsGrid listings={myListings} />}
          </Await>
        </Suspense>
      }
    </>
  )
}
