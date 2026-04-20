import CyberHeader from "@/components/cyber/CyberHeader";
import CyberHeroGateway from "@/components/cyber/CyberHeroGateway";
import CyberConnectivityRing from "@/components/cyber/CyberConnectivityRing";
import CyberRoutingPanel from "@/components/cyber/CyberRoutingPanel";
import CyberGuardrailsGrid from "@/components/cyber/CyberGuardrailsGrid";
import CyberQuickStart from "@/components/cyber/CyberQuickStart";
import CyberFooter from "@/components/cyber/CyberFooter";
import GlowDivider from "@/components/cyber/GlowDivider";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function Index() {
  return (
    <main id="top" className="min-h-screen bg-[#030916] text-cyan-50">
      <ScrollProgressBar />
      <CyberHeader />
      <CyberHeroGateway />
      <GlowDivider />
      <CyberConnectivityRing />
      <GlowDivider />
      <CyberRoutingPanel />
      <GlowDivider />
      <CyberGuardrailsGrid />
      <CyberQuickStart />
      <CyberFooter />
    </main>
  );
}
