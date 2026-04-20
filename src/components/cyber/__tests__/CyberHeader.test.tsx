import { fireEvent, render, screen } from "@testing-library/react";
import CyberHeader from "@/components/cyber/CyberHeader";

test("shows mobile overlay menu", () => {
  render(<CyberHeader />);
  const toggle = screen.getByLabelText("Toggle cyber menu");
  expect(toggle).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByTestId("cyber-mobile-menu")).toBeInTheDocument();
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("uses cyber brand mark svg", () => {
  render(<CyberHeader />);
  const brand = screen.getByAltText("Tingly Cyber mark") as HTMLImageElement;
  expect(brand.src).toContain("/cyber/brand-mark.svg");
});
