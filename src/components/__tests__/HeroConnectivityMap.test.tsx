import { render, screen } from "@testing-library/react";
import HeroConnectivityMap from "@/components/HeroConnectivityMap";

test("renders center node and four provider nodes", () => {
  render(<HeroConnectivityMap />);
  expect(screen.getByText("Tingly Node")).toBeInTheDocument();
  expect(screen.getByText("OpenAI")).toBeInTheDocument();
  expect(screen.getByText("Gemini")).toBeInTheDocument();
  expect(screen.getByText("Claude")).toBeInTheDocument();
  expect(screen.getByText("DeepSeek")).toBeInTheDocument();
});
