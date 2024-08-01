import { Badge } from "@/components/ui/badge"
import { JobListing } from "../constants/types"
import { ListingCard } from "./ListingCard"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteListing as deleteListingService} from "../services/listings"
import { useMemo, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

type MyListingsGridProps = {
  listings: JobListing[]
}

export function MyListingsGrid({ listings }: MyListingsGridProps) {
  const [deletedListingID, setDeletedListingIds] = useState<string[]>([])
  const visibleListings = useMemo(() => {
    return listings.filter((listing) => !deletedListingID.includes(listing.id))
  }, [listings, deletedListingID])

  function deleteListing(id: string) {
    deleteListingService(id).catch(() => {
      toast({
        title: "Failed to delete job listing",
        action: (
          <ToastAction
            altText="Click the delete button in the job card to retry"
            onClick={() => deleteListingService(id)}
          >
            Retry
          </ToastAction>
        ),
      })
      setDeletedListingIds((ids) => {
        return ids.filter((listingId) => listingId !== id)
      })
    })
    setDeletedListingIds((ids) => [...ids, id])
  }

  return (
    <div className="flex flex-col sm:grid gap-4 grid-cols-[repeat(auto-fill,minmax(400px,1fr))]">
      {visibleListings.map((listing) => (
        <MyListingCard
          key={listing.id}
          listing={listing}
          deleteListing={deleteListing}
        />
      ))}
    </div>
  )
}

type MyListingCardProps = {
  listing: JobListing
  deleteListing: (id: string) => void
}

function MyListingCard({ listing, deleteListing }: MyListingCardProps) {
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
            <DeleteJobListing deleteListing={() => deleteListing(listing.id)} />
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

type DeleteJobListingProps = {
  deleteListing: () => void
}
function DeleteJobListing({ deleteListing }: DeleteJobListingProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this job listing?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your job
            listing and any remaining time will not be refunded.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteListing}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
