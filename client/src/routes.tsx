import { Navigate, RouteObject } from "react-router-dom"
import { RootLayout } from "@/layouts/RootLayout"
import { ErrorPage } from "@/pages/ErrorPage"
import { TaskListPage } from "@/pages/tasks/TaskListPage"
import { NewTaskPage } from "@/pages/tasks/NewTaskPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { AuthLayout, LoginForm, SignupForm } from "@/features/auth"
import NewListingPage from "./pages/jobs/NewListingPage"
import { MyListingsRoute } from "./pages/jobs/my-listings"
import { EditListingRoute } from "./pages/jobs/edit-listing"
import { OrderCompleteRoute } from "./pages/jobs/order-complete"
import { JobListingsRoute } from "./pages/jobs/job-listings"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Navigate to="/tasks" replace />,
          },
          {
            path: "tasks",
            children: [
              { index: true, element: <TaskListPage /> },
              { path: "new", element: <NewTaskPage /> },
            ],
          },
          {
            element: <AuthLayout />,
            children: [
              { path: "login", element: <LoginForm /> },
              { path: "signup", element: <SignupForm /> },
            ],
          },
          {
            path: "jobs",
            children: [
              { index: true, ...JobListingsRoute },
              { path: "my-listings", ...MyListingsRoute },
              { path: ":id/edit", ...EditListingRoute },
              { path: "order-complete", ...OrderCompleteRoute },
              { path: "new", element: <NewListingPage /> },
            ],
          },
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
]
