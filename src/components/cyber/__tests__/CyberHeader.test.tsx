import { fireEvent, render, screen } from "@testing-library/react";
import CyberHeader from "@/components/cyber/CyberHeader";

test("shows mobile overlay menu", () => {
  render(<CyberHeader />);
  fireEvent.click(screen.getByLabelText("Toggle cyber menu"));
  expect(screen.getByTestId("cyber-mobile-menu")).toBeInTheDocument();
});

test("uses cyber brand mark svg", () => {
  render(<CyberHeader />);
  const brand = screen.getByAltText("Tingly Cyber mark") as HTMLImageElement;
  expect(brand.src).toContain("/cyber/brand-mark.svg");
});
