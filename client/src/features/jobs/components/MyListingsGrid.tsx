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
import {
  createPublishPaymentIntent,
  deleteListing as deleteListingService,
} from "../services/listings"
import { useMemo, useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { ListingGrid } from "./ListingGrid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { JOB_LISTING_DURATIONS } from "@backend/constants/types"
import { getJobListingPriceInCents } from "@backend/utils/getJobListingPriceInCents"
import { formatCurrency } from "@/utils/formatters"
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Elements } from "@stripe/react-stripe-js"
import { useTheme } from "@/hooks/useTheme"
import { stripePromise } from "@/lib/stripe"
import { ListingCheckoutForm } from "./ListingCheckoutForm"
import { formatDistanceStrict, isAfter } from "date-fns"

type MyListingsGridProps = {
  listings: JobListing[]
}

export function MyListingsGrid({ listings }: MyListingsGridProps) {
  const [deletedListingIds, setDeletedListingIds] = useState<string[]>([])
  const visibleListings = useMemo(() => {
    return listings.filter((listing) => !deletedListingIds.includes(listing.id))
  }, [listings, deletedListingIds])

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
    <ListingGrid>
      {visibleListings.map((listing) => (
        <MyListingCard
          key={listing.id}
          listing={listing}
          deleteListing={deleteListing}
        />
      ))}
    </ListingGrid>
  )
}

type MyListingCardProps = {
  listing: JobListing
  deleteListing: (id: string) => void
}

function MyListingCard({ listing, deleteListing }: MyListingCardProps) {
  const [selectedDuration, setSelectedDuration] =
    useState<(typeof JOB_LISTING_DURATIONS)[number]>()
  const [clientSecret, setClientSecret] = useState<string>()
  const { isDark } = useTheme()
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
              {status === "Active" &&
                listing.expiresAt != null &&
                ` - ${getDaysRemainingText(listing.expiresAt)}`}
            </Badge>
          </div>
        }
        footerBtns={
          <>
            <DeleteJobListingDialog
              deleteListing={() => deleteListing(listing.id)}
            />
            <Button variant="outline" asChild>
              <Link to={`/jobs/${listing.id}/edit`}>Edit</Link>
            </Button>
            <Dialog
              open={selectedDuration != null}
              onOpenChange={(isOpen) => {
                if (isOpen) return
                setSelectedDuration(undefined)
                setClientSecret(undefined)
              }}
            >
              <DialogContent>
                <DialogTitle>
                  {getPublishButtonText(status)} {listing.title} for{" "}
                  {selectedDuration} days
                </DialogTitle>
                <DialogDescription>
                  This is a non-refundable purchase
                </DialogDescription>
                {clientSecret != null && selectedDuration != null && (
                  <Elements
                    options={{
                      clientSecret,
                      appearance: { theme: isDark ? "night" : "stripe" },
                    }}
                    stripe={stripePromise}
                  >
                    <ListingCheckoutForm
                      amount={getJobListingPriceInCents(selectedDuration) / 100}
                    />
                  </Elements>
                )}
              </DialogContent>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="default">
                    {getPublishButtonText(status)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {JOB_LISTING_DURATIONS.map((duration) => (
                    <DropdownMenuItem
                      key={duration}
                      onClick={async () => {
                        setSelectedDuration(duration)
                        const { clientSecret } =
                          await createPublishPaymentIntent(listing.id, duration)
                        console.log(clientSecret)
                        setClientSecret(clientSecret)
                      }}
                    >
                      {duration} Days -{" "}
                      {formatCurrency(
                        getJobListingPriceInCents(duration) / 100
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </Dialog>
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

function getDaysRemainingText(expiresAt: Date) {
  return `${formatDistanceStrict(expiresAt, new Date(), { unit: "day" })} left`
}

function getPublishButtonText(status: ReturnType<typeof getJobListingStatus>) {
  switch (status) {
    case "Draft":
      return "Publish"
    case "Active":
      return "Extend"
    case "Expired":
      return "Republish"
  }
}

type DeleteJobListingDialogProps = {
  deleteListing: () => void
}
function DeleteJobListingDialog({
  deleteListing,
}: DeleteJobListingDialogProps) {
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
