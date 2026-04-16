import { useEffect, useState } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollableHeight <= 0 ? 0 : (window.scrollY / scrollableHeight) * 100;
      setProgress(Math.min(100, Math.max(0, ratio)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 top-0 z-[80] h-[2px] w-full bg-transparent" aria-hidden>
      <div
        data-testid="scroll-progress-bar"
        className="h-[2px] bg-[#0057E7] transition-[width] duration-150"
        style={{ width: `${progress}%`, height: "2px" }}
      />
    </div>
  );
}
