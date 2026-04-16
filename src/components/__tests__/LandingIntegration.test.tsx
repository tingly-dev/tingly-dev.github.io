import { render, screen } from "@testing-library/react";
import Index from "@/pages/Index";

test("renders redesigned sections", () => {
  render(<Index />);
  expect(screen.getByText("Intelligence, Orchestrated.")).toBeInTheDocument();
  expect(document.getElementById("features")).toBeTruthy();
  expect(document.getElementById("proxy-flow")).toBeTruthy();
  expect(document.getElementById("sdk")).toBeTruthy();
});
