import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Index from "@/pages/Index";

test("renders unified gateway v2 sections", () => {
  render(<Index />);
  expect(screen.getByText("The Definitive Agent Gateway")).toBeInTheDocument();
  expect(screen.getByText("Blueprint Technologies")).toBeInTheDocument();
  expect(screen.getByText("Unified API Gateway")).toBeInTheDocument();
  expect(screen.getByText("Smart Routing and Load Balancing")).toBeInTheDocument();
  expect(screen.getByText("Intelligent Guardrails")).toBeInTheDocument();
  expect(screen.getByText("High Performance Core")).toBeInTheDocument();
  expect(screen.getByText("~1ms")).toBeInTheDocument();
  expect(screen.getByText("Single Binary")).toBeInTheDocument();
});

test("uses local stitch assets and copy action", async () => {
  const user = userEvent.setup();
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "clipboard", {
    value: { writeText },
    configurable: true,
  });

  render(<Index />);
  const hero = screen.getByAltText(/Comprehensive technical diagram/i) as HTMLImageElement;
  expect(hero.src).toContain("/stitch/f522ca807a86478380b2723d4fa7f348/hero-diagram.png");

  await user.click(screen.getByLabelText("Copy command"));
  expect(writeText).toHaveBeenCalledWith("npx tingly-box@latest");
});
