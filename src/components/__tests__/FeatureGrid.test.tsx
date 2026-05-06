import { render, screen } from "@testing-library/react";
import FeatureGrid from "@/components/FeatureGrid";

test("renders feature cards", () => {
  render(<FeatureGrid />);
  expect(screen.getByText("Unified API")).toBeInTheDocument();
});
