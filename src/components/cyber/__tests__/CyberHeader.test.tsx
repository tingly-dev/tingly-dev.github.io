import { render, screen } from "@testing-library/react";
import CyberHeader from "@/components/cyber/CyberHeader";

test("uses cyber brand mark svg", () => {
  render(<CyberHeader />);
  const brand = screen.getByAltText("Tingly Cyber mark") as HTMLImageElement;
  expect(brand.src).toContain("/cyber/brand-mark.svg");
});
