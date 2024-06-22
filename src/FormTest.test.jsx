import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { RefForm as Form } from "./RefForm"
import userEvent from "@testing-library/user-event"

describe("Test form functionality", () => {
  it("should call onSubmit when the form is valid with the correct data", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Form onSubmit={onSubmit} />)

    const email = "test@webdevsimplified.com"
    const pass = "Password123"

    await user.type(screen.getByLabelText("Email"), email)
    await user.type(screen.getByLabelText("Password"), pass)
    await user.click(screen.getByText("Submit"))

    expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument()
    expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onSubmit).toHaveBeenCalledOnce({ email, pass })
  })

  it("should not call onSubmit when the form is not valid", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Form onSubmit={onSubmit}/>)

    const email = "test2@gmail.com"
    const pass = "password"

    await user.type(screen.getByLabelText("Email"), email)
    await user.type(screen.getByLabelText("Password"), pass)
    await user.click(screen.getByText("Submit"))

    expect(screen.queryByTestId("email-error-msg")).toBeInTheDocument()
    expect(screen.queryByTestId("password-error-msg")).toBeInTheDocument()

    expect(onSubmit).not.toHaveBeenCalledOnce()
    expect(onSubmit).not.toHaveBeenCalledOnce({ email, pass })
  })

  it("should update the error message while typing", async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<Form onSubmit={onSubmit}/>)
    const email = "test@webdevsimplified.com"

    const passInput = screen.getByLabelText("Password")

    await user.type(screen.getByLabelText("Email"), email)
    await user.type(passInput, "1234")
    await user.click(screen.getByText("Submit"))

    const passError = screen.getByTestId("password-error-msg")

    expect(passError).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalledOnce()

    await user.clear(passInput)
    await user.type(passInput, "Password123")
    expect(passError).not.toBeInTheDocument()
  })
})
