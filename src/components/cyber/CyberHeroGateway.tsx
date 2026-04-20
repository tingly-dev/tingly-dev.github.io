import { motion } from "framer-motion";
import AnimatedNode from "@/components/cyber/AnimatedNode";

export default function CyberHeroGateway() {
  return (
    <section id="home" className="relative mx-auto max-w-[1200px] px-4 pt-10">
      <div className="rounded-2xl border border-cyan-400/40 bg-[#071426]/80 p-8">
        <h1 className="text-center text-4xl font-semibold text-cyan-100 md:text-5xl">Tingly: The Cybernetic Agent Gateway</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-cyan-100/70">
          Tingly agent gateway service with on the observability seams, malicious actions to blocked by anon atface things.
        </p>

        <div className="mt-8 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
          <div className="h-1.5 rounded bg-red-500/70" />
          <img src="/cyber/gateway-cube.svg" alt="Gateway cube" className="h-40 w-40" />
          <AnimatedNode>
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-300/70 bg-[#0C2D57] text-cyan-100">Agent</div>
          </AnimatedNode>
        </div>

        <motion.svg viewBox="0 0 400 80" className="mt-3 w-full" aria-label="Beam">
          <path d="M0 40 C130 40, 170 40, 400 40" stroke="#67E8F9" strokeWidth="2" fill="none" />
          <motion.circle r="4" fill="#67E8F9" animate={{ cx: [0, 400], cy: [40, 40] }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }} />
        </motion.svg>

        <div className="mx-auto mt-8 max-w-xl rounded-lg border border-cyan-300/50 bg-[#0A172A] px-4 py-4 font-mono text-cyan-100">
          $ npx tingly-box@latest
        </div>
      </div>
    </section>
  );
}
