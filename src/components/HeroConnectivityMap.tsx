import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const providers = [
  { name: "OpenAI", x: 130, y: 60 },
  { name: "Gemini", x: 430, y: 60 },
  { name: "Claude", x: 130, y: 260 },
  { name: "DeepSeek", x: 430, y: 260 },
];

export default function HeroConnectivityMap() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const applyMatch = () => setIsMobile(mediaQuery.matches);
    applyMatch();
    mediaQuery.addEventListener("change", applyMatch);
    return () => mediaQuery.removeEventListener("change", applyMatch);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[760px] rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
      <svg viewBox="0 0 560 320" className="w-full" role="img" aria-label="Connectivity map">
        <g>
          <circle cx="280" cy="160" r="34" fill="#0057E7" />
          <image href="/tingly_logo.svg" x="266" y="146" width="28" height="28" />
          <text x="280" y="212" textAnchor="middle" fontSize="12" fill="#111827">
            Tingly Node
          </text>
        </g>

        {providers.map((provider, index) => (
          <g key={provider.name}>
            <line x1="280" y1="160" x2={provider.x} y2={provider.y} stroke="#D1D5DB" strokeWidth="1.5" />
            <circle cx={provider.x} cy={provider.y} r="24" fill="#fff" stroke="#E5E7EB" />
            <text x={provider.x} y={provider.y + 40} textAnchor="middle" fontSize="12" fill="#4B5563">
              {provider.name}
            </text>
            {!isMobile && (
              <motion.circle
                cx="280"
                cy="160"
                r="4"
                fill="#60A5FA"
                animate={{ cx: [280, provider.x], cy: [160, provider.y], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, ease: "linear", repeat: Infinity, delay: index * 0.45 }}
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
