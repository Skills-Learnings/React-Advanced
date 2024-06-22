import { act, renderHook } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { useLocalStorage } from "./useLocalStorage"

describe("local storage hook", () => {
  function renderLocalStorageHook(key, initialValue) {
    return renderHook(
      ({ key, initialValue }) => useLocalStorage(key, initialValue),
      {
        initialProps: { key, initialValue },
      }
    )
  }

  afterEach(() => {
    localStorage.clear()
  })

  it("inital value passed to local storage hook should get stored in localStorage", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("inital value passed as function to local storage hook should get stored in localStorage", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, () => initialValue)

    expect(result.current[0]).toBe(initialValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
  })

  it("local storage should update when setValue is called", () => {
    const key = "key"
    const initialValue = "initial"
    const { result } = renderLocalStorageHook(key, initialValue)

    const updatedValue = "updated"
    act(() => result.current[1](updatedValue))

    expect(result.current[0]).toBe(updatedValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(updatedValue))
  })

  it("local storage to be cleared when setValue is called with undefined", () => {
    const key = "key"
    const initialValue = "initial"

    const { result } = renderLocalStorageHook(key, initialValue)

    act(() => result.current[1](undefined))

    expect(result.current[0]).toBeUndefined()
    expect(localStorage.getItem(key)).toBe(null)
  })

  it("should use the value in the local storage if it exists", () => {
    const key = "key"
    const initialValue = "initial"
    const existingValue = "existing"

    localStorage.setItem(key, JSON.stringify(existingValue))
    const { result } = renderLocalStorageHook(key, initialValue)

    expect(result.current[0]).toBe(existingValue)
    expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue))
  })
})
