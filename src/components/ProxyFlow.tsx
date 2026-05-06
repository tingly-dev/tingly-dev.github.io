import { useEffect, useMemo, useRef, useState } from "react";

const STAGES = ["Input", "Tingly Gateway", "Model Outputs"];

export default function ProxyFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressRatio, setProgressRatio] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const node = containerRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.25;
      const value = (start - rect.top) / (start - end);
      setProgressRatio(Math.min(1, Math.max(0, value)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const unlocked = useMemo(
    () => STAGES.map((_, index) => progressRatio >= (index + 1) / STAGES.length),
    [progressRatio],
  );

  return (
    <section id="proxy-flow" className="py-[120px] px-3 sm:px-4">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] px-6 py-10 md:px-10"
      >
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[#60A5FA]/50 transition-transform duration-150"
          style={{ transform: `translateX(${progressRatio * 100}%)` }}
          aria-hidden
        />

        <div className="grid gap-4 md:grid-cols-3">
          {STAGES.map((stage, index) => (
            <div
              key={stage}
              className={`rounded-xl border p-5 ${
                unlocked[index] ? "border-[#0057E7] bg-white" : "border-[#E5E7EB] bg-white/60"
              }`}
            >
              <p className="text-xs uppercase tracking-[0.14em] text-[#4B5563]">Stage {index + 1}</p>
              <h3 className="mt-2 text-lg font-semibold text-[#111827]">{stage}</h3>
              <p className="mt-2 text-sm text-[#4B5563]">
                {index === 0
                  ? "Code request arrives"
                  : index === 1
                    ? "JSON transformed and normalized"
                    : "Responses routed to provider"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
