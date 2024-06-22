import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { delayedFunc, sum } from "./utils"

/* describe("#sum", () => {
  it("should add the numbers passed to it", () => {
    const a = 1
    const b = 2
    expect(sum(a, b)).toBe(a + b)
  })
}) */

describe("#delayedFunc", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it("should call the passed in function after a delay", async () => {
    const func = vi.fn()
    delayedFunc(func)
    vi.runAllTimers()
    expect(func).toHaveBeenCalledOnce()
    expect(func).toHaveBeenCalledWith(2)
  })
})
