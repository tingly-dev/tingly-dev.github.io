import { render } from "@testing-library/react";
import ScrollProgressBar from "@/components/ScrollProgressBar";

test("renders fixed 2px progress bar", () => {
  const { getByTestId } = render(<ScrollProgressBar />);
  const bar = getByTestId("scroll-progress-bar");
  expect(bar).toBeInTheDocument();
  expect(bar).toHaveStyle({ height: "2px" });
});
