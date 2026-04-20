import { render, screen } from "@testing-library/react";
import { afterEach, test, vi } from "vitest";

test("renders cyber hero heading and command", async () => {
  const CyberHeroGateway = (await import("@/components/cyber/CyberHeroGateway")).default;
  render(<CyberHeroGateway />);
  expect(screen.getByText(/Tingly: The Cybernetic Agent Gateway/i)).toBeInTheDocument();
  expect(screen.getByText("$ npx tingly-box@latest")).toBeInTheDocument();
  expect(screen.getByAltText("Gateway cube")).toBeInTheDocument();
  expect(screen.getByLabelText("Beam")).toBeInTheDocument();
});

afterEach(() => {
  vi.resetModules();
  vi.doUnmock("framer-motion");
});

test("uses reduced-motion beam path when preference is enabled", async () => {
  vi.doMock("framer-motion", async () => {
    const React = await import("react");
    return {
      useReducedMotion: () => true,
      motion: {
        div: (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />,
        svg: (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />,
        circle: (props: React.SVGProps<SVGCircleElement> & { animate?: { cx?: number | number[] } }) => (
          <circle
            {...props}
            data-animate-cx-type={Array.isArray(props.animate?.cx) ? "array" : typeof props.animate?.cx}
          />
        ),
      },
    };
  });

  const CyberHeroGateway = (await import("@/components/cyber/CyberHeroGateway")).default;
  render(<CyberHeroGateway />);
  expect(screen.getByLabelText("Beam")).toBeInTheDocument();
  expect(document.querySelector("circle[data-animate-cx-type='number']")).toBeTruthy();
});
