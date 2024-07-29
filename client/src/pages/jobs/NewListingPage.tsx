import { PageHeader } from "@/components/ui/PageHeader"
import { createListing, ListingForm } from "@/features/jobs"
import { useNavigate } from "react-router-dom"

export default function NewListingPage() {
  const navigate = useNavigate()
  return (
    <>
      <PageHeader>New Listing</PageHeader>
      <ListingForm
        onSubmit={ async (listing) => {
          await createListing(listing)
          navigate("/jobs/my-listings")
        }}
      />
    </>
  )
}
