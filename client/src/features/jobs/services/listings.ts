import { baseApi } from "@/services/baseApi"
import { z } from "zod"
import { jobListingFormSchema } from "@backend/constants/schemas/jobListings"

export function createListing(data: z.infer<typeof jobListingFormSchema>) {
  return baseApi.post("/job-listings", data).then((res) => res.data)
}

export function editListing(id: string, data: z.infer<typeof jobListingFormSchema>) {
  return baseApi.put(`/job-listings/${id}`, data).then((res) => res.data)
}

export function getUserListings() {
  return baseApi.get("/job-listings/my-listings").then((res) => res.data)
}

export function getJobListing(id: string) {
  return baseApi.get(`/job-listings/${id}`).then((res) => res.data)
}

export function deleteListing(id: string) {
  return baseApi.delete(`/job-listings/${id}`).then((res) => res.data)
}