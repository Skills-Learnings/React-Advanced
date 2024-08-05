import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/PageHeader"
import {
  ListingCard,
  ListingDetailsDialog,
  ListingFilterForm,
  ListingGrid,
  ListingSkeletonGrid,
  useListingFilterForm,
} from "@/features/jobs"
import { Await, useDeferredLoaderData } from "@/lib/reactRouter"
import { Suspense } from "react"
import { Link } from "react-router-dom"
import { loader } from "./loader"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { Eye, Heart } from "lucide-react"
import { EyeOff } from "lucide-react"
import { cn } from "@/utils/shadcnUtils"

export function JobListingsPage() {
  const { jobListingsPromise } = useDeferredLoaderData<typeof loader>()
  const [hiddenListingIds, setHiddenListingIds] = useLocalStorage<string[]>(
    "hiddenListingsIds",
    []
  )
  const [favoriteListingIds, setFavoriteListingIds] = useLocalStorage<string[]>(
    "favoriteListingsIds",
    []
  )
  const { form, getFilteredListings } = useListingFilterForm()

  function toggleFavorite(jobListingId: string) {
    setFavoriteListingIds((ids) => {
      if (ids.includes(jobListingId)) {
        return ids.filter((id) => id !== jobListingId)
      }

      return [...ids, jobListingId]
    })
  }

  function toggleHide(jobListingId: string, title: string) {
    setHiddenListingIds((ids) => {
      if (ids.includes(jobListingId)) {
        return ids.filter((id) => id !== jobListingId)
      }

      return [...ids, jobListingId]
    })

    if (hiddenListingIds.includes(jobListingId)) return

    toast({
      title: "Job Hidden",
      description: `${title} will no longer be shown`,
      action: (
        <ToastAction
          onClick={() => {
            setHiddenListingIds((ids) =>
              ids.filter((id) => id !== jobListingId)
            )
          }}
          altText="Click show hidden in the filter section to show hidden jobs and then click the show button in the card to show this job again"
        >
          Undo
        </ToastAction>
      ),
    })
  }

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
        Job Listings
      </PageHeader>
      <ListingFilterForm className="mb-12" form={form} />
      <Suspense fallback={<ListingSkeletonGrid />}>
        <Await resolve={jobListingsPromise}>
          {(jobListings) => (
            <ListingGrid>
              {getFilteredListings(
                jobListings,
                hiddenListingIds,
                favoriteListingIds
              ).map((listing) => {
                const isFavorite = favoriteListingIds.includes(listing.id)
                const isHidden = hiddenListingIds.includes(listing.id)
                const HideIcon = isHidden ? Eye : EyeOff

                return (
                  <ListingCard
                    key={listing.id}
                    className={isHidden ? "opacity-50" : undefined}
                    {...listing}
                    footerBtns={<ListingDetailsDialog {...listing} />}
                    headerDetails={
                      <div className="-mr-3 -mt-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => toggleHide(listing.id, listing.title)}
                        >
                          <HideIcon className="w-4 h-4" />
                          <div className="sr-only">
                            {isHidden ? "Show" : "Hide"}
                          </div>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                          onClick={() => toggleFavorite(listing.id)}
                        >
                          <Heart
                            className={cn(
                              "w-4 h-4",
                              isFavorite && "fill-red-500 stroke-red-500"
                            )}
                          />
                          <div className="sr-only">
                            {isFavorite ? "Un-Favorite" : "Favorite"}
                          </div>
                        </Button>
                      </div>
                    }
                  />
                )
              })}
            </ListingGrid>
          )}
        </Await>
      </Suspense>
    </>
  )
}
