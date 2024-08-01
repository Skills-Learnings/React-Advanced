import { PrivatePage } from "@/components/routing/PrivatePage"
import { loader } from "./loader"
import { EditListingPage } from "./Page"

export const EditListingRoute = {
  loader,
  element: (
    <PrivatePage>
      <EditListingPage />
    </PrivatePage>
  ),
}
