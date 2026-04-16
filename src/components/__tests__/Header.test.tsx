import { fireEvent, render, screen } from "@testing-library/react";
import Header from "@/components/Header";

test("shows full-screen mobile overlay menu", () => {
  render(<Header />);
  fireEvent.click(screen.getByLabelText("Toggle menu"));
  expect(screen.getByTestId("mobile-menu-overlay")).toBeInTheDocument();
});

test("uses local tingly logo asset", () => {
  render(<Header />);
  const logo = screen.getByAltText("Tingly logo") as HTMLImageElement;
  expect(logo.src).toContain("/tingly_logo.svg");
});
