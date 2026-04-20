import { render, screen } from "@testing-library/react";
import Index from "@/pages/Index";

test("renders cyber redesign sections", () => {
  render(<Index />);
  expect(screen.getByText(/Tingly: The Cybernetic Agent Gateway/i)).toBeInTheDocument();
  expect(screen.getByText("2. Universal Connectivity")).toBeInTheDocument();
  expect(screen.getByText("3. Model Intelligence Routing")).toBeInTheDocument();
  expect(screen.getByText("4. Guardrails-based Agent Security Runtime")).toBeInTheDocument();
  expect(screen.getByText(/Quick Start Protocol/i)).toBeInTheDocument();
  expect(document.getElementById("services")).toBeInTheDocument();
  expect(document.getElementById("about")).toBeInTheDocument();
  expect(document.getElementById("resources")).toBeInTheDocument();
});

test("uses cyber root background class", () => {
  const { container } = render(<Index />);
  expect(container.querySelector("main")?.className).toContain("bg-[#030916]");
});
