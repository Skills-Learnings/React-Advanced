import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { PageHeader } from "@/components/ui/PageHeader"
import { editListing, ListingForm } from "@/features/jobs"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { loader } from "./loader"

export function EditListingPage() {
  const navigate = useNavigate()
  const { id, listingPromise } = useDeferredLoaderData<typeof loader>()
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
