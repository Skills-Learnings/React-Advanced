import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import { MyListingsGrid } from "@/features/jobs"
import { Suspense } from "react"
import { Await, Link, useLoaderData } from "react-router-dom"

export function MyListingsPage() {
  const { myListingsPromise } = useLoaderData()
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
        <Suspense fallback="loading">
          <Await resolve={myListingsPromise}>
            {(myListings) => <MyListingsGrid listings={myListings} />}
          </Await>
        </Suspense>
      }
    </>
  )
}
