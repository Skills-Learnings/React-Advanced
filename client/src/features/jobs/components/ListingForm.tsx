import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Control, FieldValues, Path, PathValue, useForm } from "react-hook-form"
import {
  JOB_LISTING_EXPERIENCE_LEVELS,
  JOB_LISTING_TYPES,
} from "../constants/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { jobListingFormSchema } from "@backend/constants/schemas/jobListings"
import { z } from "zod"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { useState } from "react"
import { ListingCard } from "./ListingCard"
import { ListingDetailsDialog } from "./ListingDetailsDialog"
import ListingGrid from "./ListingGrid"

type ListingFormValues = z.infer<typeof jobListingFormSchema>

const DEFAULT_VALUES: ListingFormValues = {
  title: "",
  companyName: "",
  location: "",
  applyUrl: "",
  type: "Full Time",
  experienceLevel: "Mid-Level",
  salary: NaN,
  shortDescription: "",
  description: "",
}

type ListingFormProps = {
  initialListing?: ListingFormValues
  onSubmit: (listing: ListingFormValues) => void
}

export function ListingForm({
  initialListing = DEFAULT_VALUES,
  onSubmit,
}: ListingFormProps) {
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(jobListingFormSchema),
    defaultValues: initialListing,
  })
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const listingValues = form.watch()

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applyUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ListingSelectFormField
              control={form.control}
              label="Type"
              name="type"
              options={JOB_LISTING_TYPES}
            />
            <ListingSelectFormField
              control={form.control}
              label="Experience Level"
              name="experienceLevel"
              options={JOB_LISTING_EXPERIENCE_LEVELS}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      value={isNaN(field.value) ? "" : field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                  <FormDescription>Max 200 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-full">
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}/>
                  </FormControl>
                  <FormDescription>Supports full Markdown</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsPreviewOpen((e) => !e)}
            >
              {isPreviewOpen ? "Close" : "Show"} Preview
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Save"}
            </Button>
          </div>
        </form>
      </Form>
      {isPreviewOpen && (
        <ListingGrid className="mt-12">
          <ListingCard
            {...listingValues}
            footerBtns={<ListingDetailsDialog {...listingValues} />}
          />
        </ListingGrid>
      )}
    </>
  )
}

type ListingSelectFormFieldProps<T extends FieldValues> = {
  label: string
  control: Control<T>
  name: Path<T>
  options: readonly PathValue<T, Path<T>>[]
}

function ListingSelectFormField<T extends FieldValues>({
  label,
  control,
  name,
  options,
}: ListingSelectFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            onValueChange={(val) =>
              field.onChange(val as PathValue<T, Path<T>>)
            }
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
