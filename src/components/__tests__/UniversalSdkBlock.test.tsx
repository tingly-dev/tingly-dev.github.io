import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import UniversalSdkBlock from "@/components/UniversalSdkBlock";

test("copy button changes to check state", async () => {
  Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } });
  render(<UniversalSdkBlock />);
  const copy = screen.getByRole("button", { name: /copy code/i });
  fireEvent.click(copy);
  expect(await screen.findByText("Copied")).toBeInTheDocument();
});
