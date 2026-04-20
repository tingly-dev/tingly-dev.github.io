import { render, screen } from "@testing-library/react";
import CyberHeroGateway from "@/components/cyber/CyberHeroGateway";

test("renders cyber hero heading and command", () => {
  render(<CyberHeroGateway />);
  expect(screen.getByText(/Tingly: The Cybernetic Agent Gateway/i)).toBeInTheDocument();
  expect(screen.getByText("$ npx tingly-box@latest")).toBeInTheDocument();
  expect(screen.getByAltText("Gateway cube")).toBeInTheDocument();
  expect(screen.getByLabelText("Beam")).toBeInTheDocument();
});
