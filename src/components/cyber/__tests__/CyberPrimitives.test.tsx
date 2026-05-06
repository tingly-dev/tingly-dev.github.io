import { render, screen } from "@testing-library/react";
import NeonCard from "@/components/cyber/NeonCard";
import GlowDivider from "@/components/cyber/GlowDivider";

test("renders neon card children", () => {
  render(
    <NeonCard>
      <div>content</div>
    </NeonCard>,
  );
  expect(screen.getByText("content")).toBeInTheDocument();
});

test("renders glow divider", () => {
  render(<GlowDivider />);
  expect(screen.getByTestId("cyber-glow-divider")).toBeInTheDocument();
});
