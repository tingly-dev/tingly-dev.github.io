import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

const examples = {
  js: "import OpenAI from 'openai';\nconst client = new OpenAI({ baseURL: 'http://localhost:12580/tingly/openai/v1' });",
  py: "from openai import OpenAI\nclient = OpenAI(base_url='http://localhost:12580/tingly/openai/v1')",
  go: "client := openai.NewClient(option.WithBaseURL(\"http://localhost:12580/tingly/openai/v1\"))",
};

export default function UniversalSdkBlock() {
  const [tab, setTab] = useState<keyof typeof examples>("js");
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(examples[tab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1300);
  };

  return (
    <section id="sdk" className="py-[120px] px-3 sm:px-4">
      <div className="mx-auto max-w-[1200px] rounded-2xl border border-[#E5E7EB] bg-[#F3F4F6] p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#EF4444]" />
            <span className="h-3 w-3 rounded-full bg-[#F59E0B]" />
            <span className="h-3 w-3 rounded-full bg-[#10B981]" />
          </div>
          <button
            aria-label="Copy code"
            onClick={copyCode}
            className="inline-flex items-center gap-2 rounded-md border border-[#E5E7EB] bg-white px-3 py-1.5 text-sm"
          >
            {copied ? <Check className="h-4 w-4 text-[#10B981]" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="mb-4 flex gap-2">
          {(["js", "py", "go"] as const).map((language) => (
            <button
              key={language}
              onClick={() => setTab(language)}
              className={`rounded px-3 py-1.5 text-sm ${
                tab === language ? "bg-[#0057E7] text-white" : "bg-white text-[#4B5563]"
              }`}
            >
              {language.toUpperCase()}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.pre
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto rounded-lg border border-[#E5E7EB] bg-white p-4 text-sm text-[#111827]"
          >
            <code>{examples[tab]}</code>
          </motion.pre>
        </AnimatePresence>
      </div>
    </section>
  );
}
