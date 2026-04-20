import { Menu, X } from "lucide-react";
import { useState } from "react";

const desktopLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#resources", label: "Resources" },
];

export default function CyberHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-400/20 bg-[#050B16]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:px-8">
        <a href="#top" className="flex items-center gap-2 text-cyan-100">
          <img src="/cyber/brand-mark.svg" alt="Tingly Cyber mark" className="h-6 w-6" />
          <span className="text-sm font-semibold tracking-[0.18em] uppercase">Tingly</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-cyan-100/85 md:flex">
          {desktopLinks.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-cyan-300">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="https://github.com/tingly-dev/tingly-box/releases"
          className="hidden rounded-md border border-cyan-300/60 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-cyan-100 transition-colors hover:border-cyan-200 hover:text-cyan-300 md:inline-flex"
        >
          Expert Script
        </a>

        <button
          type="button"
          aria-label="Toggle cyber menu"
          aria-expanded={open}
          className="relative z-50 rounded border border-cyan-300/40 p-2 text-cyan-100 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {open ? (
        <div
          data-testid="cyber-mobile-menu"
          className="fixed inset-0 z-40 border-t border-cyan-400/20 bg-[#08162E]/96 px-4 py-20 text-cyan-100 md:hidden"
        >
          <nav className="flex flex-col gap-4 text-2xl font-semibold tracking-[-0.03em]">
            {desktopLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
