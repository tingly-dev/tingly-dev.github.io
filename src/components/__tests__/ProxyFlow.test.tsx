import { render, screen } from "@testing-library/react";
import ProxyFlow from "@/components/ProxyFlow";

test("renders proxy pipeline stages", () => {
  render(<ProxyFlow />);
  expect(screen.getByText("Input")).toBeInTheDocument();
  expect(screen.getByText("Tingly Gateway")).toBeInTheDocument();
  expect(screen.getByText("Model Outputs")).toBeInTheDocument();
});
