import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Counter from "./Counter";

it("should render the counter", () => {
  render(<Counter/>)
  screen.debug()
})