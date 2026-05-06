import NeonCard from "@/components/cyber/NeonCard";
import Scanline from "@/components/cyber/Scanline";

export default function CyberRoutingPanel() {
  return (
    <section id="about" className="mx-auto mt-10 max-w-[1200px] px-4">
      <NeonCard>
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-cyan-100">3. Model Intelligence Routing</h2>
            <p className="mt-3 text-sm text-cyan-100/75">
              Route requests by latency, cost, and policy while preserving unified request formats and fallback behavior.
            </p>

            <div className="mt-5 rounded-lg border border-cyan-300/30 bg-[#08162A] p-4 font-mono text-xs text-cyan-100/85">
              <p>routerConfig:</p>
              <p className="mt-1">mode: TINGLY_GATEWAY</p>
              <p className="mt-1">routing: latency + cost + health</p>
              <p className="mt-1">fallback: safe-model</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-cyan-300/35 bg-[#0A1A30] p-5">
            <Scanline />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between rounded-md border border-cyan-300/35 bg-[#10233E] px-3 py-2">
                <span className="text-xs text-cyan-100/80">Input</span>
                <span className="rounded bg-cyan-300/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-cyan-200">SDK</span>
              </div>
              <div className="h-px bg-cyan-300/35" />
              <div className="flex items-center justify-between rounded-md border border-cyan-300/35 bg-[#10233E] px-3 py-2">
                <span className="text-xs text-cyan-100/80">Gateway</span>
                <span className="rounded bg-blue-400/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-200">JSON transform</span>
              </div>
              <div className="h-px bg-cyan-300/35" />
              <div className="flex items-center justify-between rounded-md border border-cyan-300/35 bg-[#10233E] px-3 py-2">
                <span className="text-xs text-cyan-100/80">Output</span>
                <span className="rounded bg-emerald-400/20 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-200">Best model selected</span>
              </div>
            </div>
          </div>
        </div>
      </NeonCard>
    </section>
  );
}
