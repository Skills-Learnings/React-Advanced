import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { JobListing } from "../constants/types"
import { Button } from "@/components/ui/button"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Badge } from "@/components/ui/badge"
import {
  Banknote,
  CalendarDays,
  ExternalLink,
  GraduationCap,
} from "lucide-react"
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer"
import { formatCurrency } from "@/utils/formatters"

type ListingDetailsDialogProps = Pick<
  JobListing,
  | "title"
  | "companyName"
  | "description"
  | "experienceLevel"
  | "salary"
  | "location"
  | "type"
  | "applyUrl"
>

export function ListingDetailsDialog({
  title,
  companyName,
  location,
  salary,
  type: jobType,
  experienceLevel,
  description,
  applyUrl,
}: ListingDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View More</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] flex flex-col max-w-3xl w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <div>{companyName}</div>
            <div>{location}</div>
          </DialogDescription>
          <div className="flex gap-1 whitespace-nowrap">
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <Banknote className="w-4 h-4" /> {formatCurrency(salary)}
            </Badge>
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <CalendarDays className="w-4 h-4" /> {jobType}
            </Badge>
            <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
              <GraduationCap className="w-4 h-4" /> {experienceLevel}
            </Badge>
          </div>
        </DialogHeader>
        <div>
          <Button asChild>
            <a href={applyUrl} target="_blank">
              Apply on Company Site
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
        <MarkdownRenderer className="overflow-y-auto pr-6">
          {description}
        </MarkdownRenderer>
      </DialogContent>
    </Dialog>
  )
}
