import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import MagneticLink from "@/components/MagneticLink";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#E5E7EB] bg-white/70 backdrop-blur-[8px]">
      <div className="mx-auto grid h-16 w-full max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 md:px-8">
        <a href="/" className="relative z-50 flex items-center gap-2 text-[#111827]">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-white">
            <span className="pointer-events-none absolute inset-0 rounded-md border border-[#0057E7]/20 animate-[logoPulse_10s_ease-out_infinite]" />
            <img src="/tingly_logo.svg" alt="Tingly logo" className="h-5 w-5" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">Tingly</span>
        </a>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          <MagneticLink href="#features">Features</MagneticLink>
          <MagneticLink href="#proxy-flow">Proxy Flow</MagneticLink>
          <MagneticLink href="#sdk">Universal SDK</MagneticLink>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/tingly-dev/tingly-box/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[4px] bg-[#0057E7] px-4 py-2 text-sm font-medium text-white"
          >
            Get Started
          </a>
          <a
            href="https://github.com/tingly-dev/tingly-box"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[#4B5563]"
          >
            <FaGithub className="h-4 w-4" />
            GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="relative z-50 justify-self-end rounded-md border border-[#E5E7EB] bg-white p-2 text-[#4B5563] md:hidden"
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 z-40 dot-grid-bg bg-white/95 px-8 pt-24 md:hidden"
        >
          <div className="space-y-6 text-3xl font-semibold tracking-[-0.02em] text-[#111827]">
            <a href="#features" onClick={() => setIsOpen(false)}>
              Features
            </a>
            <a href="#proxy-flow" onClick={() => setIsOpen(false)}>
              Proxy Flow
            </a>
            <a href="#sdk" onClick={() => setIsOpen(false)}>
              Universal SDK
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
