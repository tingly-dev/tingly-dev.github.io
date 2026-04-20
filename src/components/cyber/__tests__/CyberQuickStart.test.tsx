import { render, screen } from "@testing-library/react";
import CyberQuickStart from "@/components/cyber/CyberQuickStart";

test("renders essential quick-start steps", () => {
  render(<CyberQuickStart />);
  expect(screen.getByText(/npx tingly-box@latest/i)).toBeInTheDocument();
  expect(screen.getByText(/Add providers\/API keys/i)).toBeInTheDocument();
  expect(screen.getByText(/Configure routing endpoint/i)).toBeInTheDocument();
  expect(screen.getByText(/Select active model\/provider/i)).toBeInTheDocument();
});
