import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@backend/constants/schemas/users"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { AxiosError } from "axios"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"

const formSchema = loginSchema

type FormValues = {
  email: string
  password: string
}

export default function LoginForm({}) {
  const { logIn } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(values: FormValues) {
    await logIn(values.email, values.password).catch((error) => {
      if (
        error instanceof AxiosError &&
        error.response?.data?.message != null
      ) {
        form.setError("root", { message: error.response.data.message })
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Log In</CardTitle>
            {form.formState.errors.root?.message && (
              <CardDescription className="text-red-500 dark:text-red-900">
                {form.formState.errors.root.message}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="flex flex-col w-full gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="gap-2 justify-end">
            <Button variant="ghost" asChild>
              <Link to="/">Cancel</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Signup</Link>
            </Button>
            <Button type="submit" variant="default">
              {form.formState.isSubmitting ? <LoadingSpinner /> : "Login"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
