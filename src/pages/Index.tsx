import { Check, Copy, Github } from "lucide-react";
import { useState } from "react";

type TechRow = {
  badge: string;
  title: string;
  description: React.ReactNode;
  points: string[];
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
};

const techRows: TechRow[] = [
  {
    badge: "Universal Connector",
    title: "Unified API Gateway",
    description:
      "Never modify your agent. Connect to models with all kinds of protocol (Anthropic, OpenAI, Gemini) and MCP tools in a unified way.",
    points: [
      "Standardized schema across multiple providers.",
      "Seamless MCP tool integration and orchestration.",
    ],
    imageSrc: "/stitch/f522ca807a86478380b2723d4fa7f348/unified-api.png",
    imageAlt: "Unified API Gateway technical diagram",
    reverse: true,
  },
  {
    badge: "Routing Core",
    title: "Smart Routing and Load Balancing",
    description: (
      <>
        Implement sophisticated traffic management tailored for AI agents. Our engine features multi-condition routing and
        request affinity, ensuring contexts remain stable across continuous interactions. Defined simply in your{" "}
        <code className="font-mono text-sm bg-[#eef1f3] px-1 rounded">router.go</code>.
      </>
    ),
    points: [
      "Dynamic weighting across multiple LLM backends.",
      "Stateful connection pinning for session continuity.",
    ],
    imageSrc: "/stitch/f522ca807a86478380b2723d4fa7f348/routing-balancing.png",
    imageAlt: "Server rack infrastructure with glowing blue lights indicating data transfer and load balancing",
  },
  {
    badge: "Security Layer",
    title: "Intelligent Guardrails",
    description: (
      <>
        Protect your infrastructure before the model even executes. Our guardrails provide active malicious action detection
        and prevention, analyzing intent and structure in real-time. Configure custom policies directly in{" "}
        <code className="font-mono text-sm bg-[#eef1f3] px-1 rounded">policy.go</code>.
      </>
    ),
    points: [
      "Pre-execution prompt injection filtering.",
      "Output sanitization and PII redaction.",
    ],
    imageSrc: "/stitch/f522ca807a86478380b2723d4fa7f348/intelligent-guardrails.png",
    imageAlt: "Digital security shield with biometric scanning and threat detection interface",
    reverse: true,
  },
];

function CopyCommand() {
  const command = "npx tingly-box@latest";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-[#d9dde0] p-4 rounded-lg flex items-center space-x-4 mb-16 shadow-[0_20px_40px_rgba(44,47,49,0.06)] border border-[#abadaf]/15">
      <span className="font-mono text-[#595c5e] text-sm">~</span>
      <code className="font-mono text-[#0050d4] font-medium">{command}</code>
      <button aria-label="Copy command" className="text-[#595c5e] hover:text-[#0050d4] transition-colors" onClick={handleCopy}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export default function Index() {
  return (
    <div className="font-body text-[#2c2f31] antialiased min-h-screen flex flex-col bg-[#f5f7f9] [background-image:radial-gradient(#abadaf_1px,transparent_1px)] [background-size:24px_24px]">
      <nav className="fixed top-0 w-full z-50 bg-[#f5f7f9]/80 backdrop-blur-xl border-b border-[#abadaf]/15">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-[#2c2f31] font-display">
            <img src="/tingly-logo.svg" alt="Tingly logo" className="h-12 w-auto object-contain" />
          </div>
          <a
            href="https://github.com/tingly-dev/tingly-box"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#0050d4] to-[#7b9cff] text-white px-6 py-2 rounded-md uppercase tracking-widest text-sm hover:scale-95 transition-transform duration-100 ease-in-out"
          >
            <Github size={16} />
            Github
          </a>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-8 mb-32 flex flex-col items-center text-center">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-[#2c2f31] mb-6 tracking-tight leading-tight max-w-4xl">
            The Definitive Agent Gateway
          </h1>
          <p className="text-xl text-[#595c5e] mb-12 max-w-2xl">
            Deploy, scale, and secure your autonomous agents with a high-performance orchestration layer built for precision.
          </p>
          <CopyCommand />
          <div className="w-full max-w-5xl bg-white rounded-xl p-8 shadow-[0_20px_40px_rgba(44,47,49,0.06)] border border-[#abadaf]/15 relative overflow-hidden backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0050d4]/5 to-transparent pointer-events-none" />
            <img
              src="/stitch/f522ca807a86478380b2723d4fa7f348/hero-diagram.png"
              alt="Comprehensive technical diagram showing an AI agent connecting to various models, tools, and skills through the Tingly Box gateway."
              className="w-full h-auto rounded-lg object-contain"
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-8 mb-32 space-y-24">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold text-[#2c2f31] mb-4">Blueprint Technologies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#0050d4] to-[#7b9cff] mx-auto rounded-full" />
          </div>

          {techRows.map((row) => (
            <div key={row.title} className={`flex flex-col items-center gap-16 ${row.reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-xl p-6 shadow-[0_20px_40px_rgba(44,47,49,0.06)] border border-[#abadaf]/15">
                  <img alt={row.imageAlt} className="w-full h-auto max-h-80 object-contain rounded-lg" src={row.imageSrc} />
                </div>
              </div>
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-[#eef1f3] px-3 py-1 rounded-full border border-[#abadaf]/15">
                  <span className="font-label text-xs uppercase tracking-widest text-[#2c2f31]">{row.badge}</span>
                </div>
                <h3 className="font-display text-3xl font-bold text-[#2c2f31]">{row.title}</h3>
                <p className="text-[#595c5e] leading-relaxed">{row.description}</p>
                <ul className="space-y-3 pt-4">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-start space-x-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-[#0050d4]" />
                      <span className="text-[#2c2f31]">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>

        <section className="max-w-5xl mx-auto px-8">
          <div className="bg-white rounded-xl p-12 shadow-[0_20px_40px_rgba(44,47,49,0.06)] border border-[#abadaf]/15 relative overflow-hidden backdrop-blur-md flex flex-col md:flex-row items-center justify-between">
            <div className="absolute -right-24 -top-24 w-64 h-64 bg-[#0050d4]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-xl mb-8 md:mb-0">
              <h2 className="font-display text-3xl font-bold text-[#2c2f31] mb-4">High Performance Core</h2>
              <p className="text-[#595c5e] text-lg">
                Engineered for zero-bottleneck environments. Tingly Box is compiled as a single Golang binary, delivering raw power and unparalleled efficiency.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="bg-[#eef1f3] p-6 rounded-lg text-center min-w-[120px] border border-[#abadaf]/15">
                <span className="font-display text-4xl font-bold text-[#0050d4] block mb-1">~1ms</span>
                <span className="text-xs uppercase text-[#595c5e]">Added Latency</span>
              </div>
              <div className="bg-[#eef1f3] p-6 rounded-lg text-center min-w-[120px] border border-[#abadaf]/15">
                <span className="font-display text-4xl font-bold text-[#0050d4] block mb-1">1</span>
                <span className="text-xs uppercase text-[#595c5e]">Single Binary</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#abadaf]/15 bg-[#f5f7f9]">
        <div className="px-8 py-12 max-w-7xl mx-auto text-center">
          <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-[#abadaf]/25 bg-white/80 px-5 py-2.5 shadow-[0_10px_24px_rgba(44,47,49,0.08)]">
            <span className="h-2 w-2 rounded-full bg-[#0050d4]" />
            <p className="font-display text-sm md:text-base font-medium tracking-[0.01em] text-[#2c2f31]">
              Connecting your agent to the world with love.
            </p>
            <span className="h-px w-8 bg-gradient-to-r from-[#0050d4] to-[#7b9cff]" />
          </div>
        </div>
      </footer>
    </div>
  );
}
