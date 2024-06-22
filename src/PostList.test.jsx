import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import PostList from "./PostList"
import { mockServer } from "./test-setup/mockServer"
import { HttpResponse, http } from "msw"

describe("PostList component", () => {
  it("should get list of posts", async () => {
    mockServer.use(
      http.get("http://example.com/api/posts", () => {
        return HttpResponse.json([
          { id: 1, title: "post 1" },
          { id: 2, title: "post 2" },
        ])
      })
    )
    render(<PostList />)

    expect(await screen.findByText("post 1")).toBeInTheDocument()
    expect(await screen.findByText("post 2")).toBeInTheDocument()
    screen.debug()
  })
})
