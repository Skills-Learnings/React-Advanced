import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { PageHeader } from "@/components/ui/PageHeader"
import { editListing, ListingForm } from "@/features/jobs"
import { Suspense } from "react"
import { Await, useLoaderData, useNavigate } from "react-router-dom"

export function EditListingPage() {
  const navigate = useNavigate()
  const { id, listingPromise } = useLoaderData()
  return (
    <>
      <PageHeader>Edit Listing</PageHeader>
      {
        <Suspense fallback={<LoadingSpinner className="w-24 h-24" />}>
          <Await resolve={listingPromise}>
            {(listing) => (
              <ListingForm
                initialListing={listing}
                onSubmit={async (values) => {
                  await editListing(id, values)
                  navigate("/jobs/my-listings")
                }}
              />
            )}
          </Await>
        </Suspense>
      }
    </>
  )
}
