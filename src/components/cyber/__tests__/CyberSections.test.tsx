import { render, screen } from "@testing-library/react";
import CyberConnectivityRing from "@/components/cyber/CyberConnectivityRing";
import CyberRoutingPanel from "@/components/cyber/CyberRoutingPanel";

test("renders connectivity section with ecosystem icons", () => {
  render(<CyberConnectivityRing />);
  expect(screen.getByText("2. Universal Connectivity")).toBeInTheDocument();
  expect(screen.getByLabelText("Connectivity map")).toBeInTheDocument();
  expect(document.getElementById("services")).toBeInTheDocument();
  expect(screen.getByAltText("OpenAI icon")).toBeInTheDocument();
  expect(screen.getByAltText("Anthropic icon")).toBeInTheDocument();
  expect(screen.getByAltText("Gemini icon")).toBeInTheDocument();
  expect(screen.getByAltText("MCP icon")).toBeInTheDocument();
  expect(screen.getByText("OpenAI")).toBeInTheDocument();
  expect(screen.getByText("Anthropic")).toBeInTheDocument();
  expect(screen.getByText("Gemini")).toBeInTheDocument();
  expect(screen.getByText("MCP")).toBeInTheDocument();
});

test("renders routing panel with pipeline stages", () => {
  render(<CyberRoutingPanel />);
  expect(screen.getByText("3. Model Intelligence Routing")).toBeInTheDocument();
  expect(document.getElementById("about")).toBeInTheDocument();
  expect(screen.getByText(/mode: TINGLY_GATEWAY/i)).toBeInTheDocument();
  expect(screen.getByText("JSON transform")).toBeInTheDocument();
  expect(screen.getByText("Best model selected")).toBeInTheDocument();
});
