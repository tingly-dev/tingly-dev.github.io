import { fireEvent, render, screen } from "@testing-library/react";
import MagneticLink from "@/components/MagneticLink";

test("resets transform on mouse leave", () => {
  render(<MagneticLink href="#x">Demo</MagneticLink>);
  const link = screen.getByRole("link", { name: "Demo" });
  fireEvent.mouseMove(link, { clientX: 10, clientY: 10 });
  fireEvent.mouseLeave(link);
  expect(link).toHaveStyle({ transform: "translate3d(0px, 0px, 0)" });
});
