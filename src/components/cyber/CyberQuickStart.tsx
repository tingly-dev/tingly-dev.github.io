import NeonCard from "@/components/cyber/NeonCard";

const essentialSteps = [
  {
    title: "Start the Service",
    detail: "npx tingly-box@latest",
  },
  {
    title: "Add Providers",
    detail: "Add providers/API keys in the local control panel.",
  },
  {
    title: "Setup Model Routing",
    detail: "Configure routing endpoint for your SDK or CLI client.",
  },
  {
    title: "Choose Provider & Model",
    detail: "Select active model/provider and validate traffic flow.",
  },
] as const;

export default function CyberQuickStart() {
  return (
    <section className="mx-auto mt-10 max-w-[1200px] px-4">
      <NeonCard>
        <h2 className="text-3xl font-semibold text-cyan-100">Quick Start Protocol</h2>
        <ol className="mt-5 space-y-3 text-sm text-cyan-100/85">
          {essentialSteps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-lg border border-cyan-300/30 bg-[#091A30] px-3 py-3">
              <span className="mt-0.5 rounded border border-cyan-300/40 bg-cyan-300/10 px-2 py-0.5 font-mono text-xs text-cyan-100">{index + 1}</span>
              <div>
                <p className="font-medium text-cyan-100">{step.title}</p>
                {step.detail === "npx tingly-box@latest" ? (
                  <code className="mt-1 inline-block rounded bg-[#041021] px-1.5 py-0.5 font-mono text-xs text-cyan-200">{step.detail}</code>
                ) : (
                  <p className="mt-1 text-cyan-100/75">{step.detail}</p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </NeonCard>
    </section>
  );
}
