import NeonCard from "@/components/cyber/NeonCard";

const cards = [
  {
    title: "Fast Rule Matching",
    icon: "/cyber/guardrail-rule.svg",
    description: "Apply deterministic policy checks before requests leave your network boundary.",
  },
  {
    title: "Program Analysis",
    icon: "/cyber/guardrail-analysis.svg",
    description: "Track payload shape, model behavior, and policy fitness in one analysis stream.",
  },
  {
    title: "Full Trace Auditing",
    icon: "/cyber/guardrail-audit.svg",
    description: "Store event traces for incident triage, compliance snapshots, and replay debugging.",
  },
] as const;

export default function CyberGuardrailsGrid() {
  return (
    <section id="resources" className="mx-auto mt-10 max-w-[1200px] px-4">
      <NeonCard>
        <h2 className="text-center text-3xl font-semibold text-cyan-100">4. Guardrails-based Agent Security Runtime</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="rounded-xl border border-cyan-300/35 bg-[#08182E] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/60 hover:shadow-[0_10px_24px_rgba(56,189,248,0.22)]"
            >
              <img src={card.icon} alt={card.title} className="h-12 w-12" />
              <h3 className="mt-4 text-lg text-cyan-100">{card.title}</h3>
              <p className="mt-2 text-sm text-cyan-100/70">{card.description}</p>
            </article>
          ))}
        </div>
      </NeonCard>
    </section>
  );
}
