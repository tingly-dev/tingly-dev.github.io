export default function CyberFooter() {
  return (
    <footer className="mx-auto mt-12 max-w-[1200px] px-4 pb-8 text-xs text-cyan-100/70">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-cyan-400/25 pt-5 md:flex-row">
        <span>MPL-2.0 License {new Date().getFullYear()} Tingly Box</span>
        <div className="flex gap-4">
          <a href="https://github.com/tingly-dev/tingly-box" target="_blank" rel="noreferrer" className="hover:text-cyan-200">
            GitHub
          </a>
          <a href="https://github.com/tingly-dev/tingly-box/releases" target="_blank" rel="noreferrer" className="hover:text-cyan-200">
            Releases
          </a>
        </div>
      </div>
    </footer>
  );
}
