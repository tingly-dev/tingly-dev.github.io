import { features } from "@/data/text";

export default function FeatureGrid() {
  return (
    <section id="features" className="py-[120px] px-3 sm:px-4">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-3 md:px-4">
        {features.slice(0, 6).map((feature) => (
          <article
            key={feature.title}
            className="group relative rounded-[8px] border border-[#E5E7EB] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_15px_-3px_rgba(0,87,231,0.1)]"
          >
            <span className="absolute left-0 top-0 h-[2px] w-full bg-[#0057E7] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            <feature.icon className="h-6 w-6 text-[#0057E7]" />
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[#111827]">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-[#4B5563]">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
