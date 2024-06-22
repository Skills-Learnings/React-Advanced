import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { NameForm } from "./NameForm"
import userEvent from "@testing-library/user-event"

describe("NameForm component", () => {
  it("should call the onSubmit when the value is valid for name", async () => {
    const onSubmitMock = vi.fn()
    const user = userEvent.setup()
    render(<NameForm onSubmit={onSubmitMock}/>)
    const name = "Sahil"
    const nameInput = screen.getByLabelText("Name")
    const submitBtn = screen.getByText("Submit")

    await user.clear(nameInput)
    await user.click(submitBtn)

    expect(onSubmitMock).not.toHaveBeenCalled()

    await user.type(nameInput, name)
    await user.click(submitBtn)
    expect(onSubmitMock).toHaveBeenCalledWith(name)
  })
})
