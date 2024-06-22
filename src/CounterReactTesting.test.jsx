import { describe, expect, it } from "vitest"
import Counter from "./Counter"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Counter Component", () => {
  it("should render the initial count", () => {
    render(<Counter initialCount={3} />)
    screen.debug()
    expect(screen.getByText("3")).toBeInTheDocument()
  })

  it("should increment/decrement when clicking the +/- button", async () => {
    const user = userEvent.setup()
    render(<Counter initialCount={0} />)
    const minusBtn = screen.getByText("-")
    const plusBtn = screen.getByText("+")
    await user.click(plusBtn)
    expect(screen.getByText("1")).toBeInTheDocument()
    await user.click(minusBtn)
    expect(screen.getByText("0")).toBeInTheDocument()
  })
})
