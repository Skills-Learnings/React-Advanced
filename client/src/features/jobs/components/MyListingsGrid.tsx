import { Badge } from "@/components/ui/badge"
import { JobListing } from "../constants/types"
import { ListingCard } from "./ListingCard"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

type MyListingsGridProps = {
  listings: JobListing[]
}

export function MyListingsGrid({ listings }: MyListingsGridProps) {
  console.log(listings)
  return (
    <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {listings.map((listing) => (
        <MyListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}

type MyListingCardProps = {
  listing: JobListing
}

function MyListingCard({ listing }: MyListingCardProps) {
  const status = getJobListingStatus(listing.expiresAt)
  return (
    <>
      <ListingCard
        {...listing}
        headerDetails={
          <div>
            <Badge
              className="rounded"
              variant={getJobListingBadgeVariant(status)}
            >
              {status}
            </Badge>
          </div>
        }
        footerBtns={
          <>
            <Button variant="outline" asChild>
              <Link to={`/jobs/${listing.id}/edit`}>Edit</Link>
            </Button>
          </>
        }
      />
    </>
  )
}

function getJobListingStatus(expiresAt: Date | null) {
  if (expiresAt == null) {
    return "Draft"
  } else if (isAfter(expiresAt, new Date())) {
    return "Active"
  } else {
    return "Expired"
  }
}

function getJobListingBadgeVariant(
  status: ReturnType<typeof getJobListingStatus>
) {
  switch (status) {
    case "Draft":
      return "secondary"
    case "Active":
      return "default"
    case "Expired":
      return "destructive"
  }
}
