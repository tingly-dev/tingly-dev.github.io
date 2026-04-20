import { motion, useReducedMotion } from "framer-motion";
import NeonCard from "@/components/cyber/NeonCard";

const providers = [
  { name: "OpenAI", icon: "/cyber/provider-openai.svg", x: 50, y: 14 },
  { name: "Anthropic", icon: "/cyber/provider-anthropic.svg", x: 85, y: 50 },
  { name: "Gemini", icon: "/cyber/provider-gemini.svg", x: 50, y: 85 },
  { name: "MCP", icon: "/cyber/provider-mcp.svg", x: 15, y: 50 },
  { name: "External", icon: "/cyber/provider-external.svg", x: 22, y: 20 },
] as const;

export default function CyberConnectivityRing() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="mx-auto mt-10 max-w-[1200px] px-4">
      <NeonCard className="overflow-hidden">
        <h2 className="text-3xl font-semibold text-cyan-100">2. Universal Connectivity</h2>
        <p className="mt-3 max-w-2xl text-sm text-cyan-100/75">
          Connect one gateway to OpenAI, Anthropic, Gemini, MCP tools, and external endpoints through a single orchestration layer.
        </p>

        <div className="relative mt-8 aspect-[16/10] rounded-xl border border-cyan-300/35 bg-[#091A31]/90 p-6 md:aspect-[16/7]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Connectivity map">
            {providers.map((provider) => (
              <line
                key={provider.name}
                x1="50"
                y1="50"
                x2={provider.x}
                y2={provider.y}
                stroke="rgba(103,232,249,0.45)"
                strokeWidth="0.9"
              />
            ))}
          </svg>

          {!reduceMotion ? (
            <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
              {providers.map((provider, index) => (
                <motion.circle
                  key={`${provider.name}-packet`}
                  r="1.2"
                  fill="#67E8F9"
                  animate={{ cx: [50, provider.x], cy: [50, provider.y], opacity: [0, 1, 0.8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 0.7,
                    delay: index * 0.24,
                    ease: "linear",
                  }}
                />
              ))}
            </svg>
          ) : null}

          <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <img src="/cyber/agent-node.svg" alt="Tingly core node" className="h-16 w-16 md:h-20 md:w-20" />
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-100/80">Tingly Core</span>
          </div>

          {providers.map((provider) => (
            <div
              key={provider.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-xl border border-cyan-300/40 bg-[#0A203B] px-2 py-2 shadow-[0_0_12px_rgba(56,189,248,0.18)]"
              style={{ left: `${provider.x}%`, top: `${provider.y}%` }}
            >
              <img src={provider.icon} alt={`${provider.name} icon`} className="h-8 w-8 md:h-10 md:w-10" />
              <p className="mt-1 text-center text-[10px] uppercase tracking-[0.14em] text-cyan-100/85">{provider.name}</p>
            </div>
          ))}
        </div>
      </NeonCard>
    </section>
  );
}
