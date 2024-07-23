import { baseApi } from "@/services/baseApi"

export function signupService(email: string, password: string) {
  return baseApi
    .post("users/signup", { email: email, password: password })
    .then((res) => res.data)
}

export function loginService(email: string, password: string) {
  return baseApi
    .post("users/login", { email: email, password: password })
    .then((res) => res.data)
}

export function logoutService() {
  return baseApi.delete("users/logout")
}

export function getCurrentUser() {
  return baseApi.get("users/session").then((res) => res.data ?? undefined)
}
