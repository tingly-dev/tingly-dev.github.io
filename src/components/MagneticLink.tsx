import { useRef } from "react";

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function MagneticLink({ href, children, className }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const radius = 20;

    const x = Math.max(-radius, Math.min(radius, dx * 0.2));
    const y = Math.max(-radius, Math.min(radius, dy * 0.2));
    element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate3d(0px, 0px, 0)";
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className ?? "inline-block text-sm font-medium text-[#4B5563] transition-transform duration-200 hover:text-[#0057E7]"}
    >
      {children}
    </a>
  );
}
