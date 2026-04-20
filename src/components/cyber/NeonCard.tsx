import { cn } from "@/lib/utils";

export default function NeonCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-cyan-400/40 bg-[#081325]/80 p-5 shadow-[0_0_0_1px_rgba(56,189,248,0.18),0_0_28px_rgba(56,189,248,0.18)]",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.15),transparent_55%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}
