import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { JobListing } from "../constants/types"
import { Badge } from "@/components/ui/badge"
import { Banknote, CalendarDays, GraduationCap } from "lucide-react"
import { ReactNode } from "react"

type ListingCardProps = {
  className?: string
  headerDetails?: ReactNode
  footerBtns?: ReactNode
} & Pick<
  JobListing,
  | "title"
  | "companyName"
  | "experienceLevel"
  | "shortDescription"
  | "salary"
  | "location"
  | "type"
>

export function ListingCard({
  title,
  companyName,
  location,
  salary,
  type: jobType,
  experienceLevel,
  shortDescription,
  headerDetails,
  footerBtns,
}: ListingCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-4 justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex flex-col">
              <span>{companyName} </span>
              <span>{location}</span>
            </p>
          </div>
          {headerDetails}
        </div>
        <div className="flex gap-1 flex-wrap">
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <Banknote className="w-4 h-4" />
            {salary}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <CalendarDays className="w-4 h-4" />
            {jobType}
          </Badge>
          <Badge variant="secondary" className="flex gap-1 whitespace-nowrap">
            <GraduationCap className="w-4 h-4" />
            {experienceLevel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">{shortDescription}</CardContent>
      <CardFooter className="flex gap-2 items-stretch justify-end">
        {footerBtns}
      </CardFooter>
    </Card>
  )
}
