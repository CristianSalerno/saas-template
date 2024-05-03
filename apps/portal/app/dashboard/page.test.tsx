import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("dashboard Page Test Suit", () => {
  it("should render dashboard page", async () => {
    expect.hasAssertions();

    render(await Page());

    expect(screen.getByTestId("dashboard.title").textContent).toBe("Dashboard");
  });
});
