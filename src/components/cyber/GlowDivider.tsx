export default function GlowDivider() {
  return (
    <div data-testid="cyber-glow-divider" className="relative my-10 h-px w-full bg-cyan-400/40">
      <div className="absolute inset-0 animate-[cyberSweep_4s_linear_infinite] bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-80" />
    </div>
  );
}
