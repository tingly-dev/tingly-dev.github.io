# Tingly Cyber Landing Redesign Spec

## Goal
Fully replace the current `/` landing page with an interactive neon-cyber technical design that closely matches `tingly_website.png`, while preserving practical value from current Tingly content (especially quick-start essentials).

## Scope
In scope:
- Full visual replacement of current landing page at `src/pages/Index.tsx`.
- New cyber layout and motion system closely matching screenshot composition.
- New repo-native SVG icon/logo asset pack for cyber look.
- Preservation of essential quick-start information and practical CTA command.

Out of scope:
- Backend/API changes.
- New routes for alternate designs.
- Restoring old gallery/FAQ blocks unless needed for required information.

## Information Architecture
The page will be rendered as a single long-form landing view at `/` in this order:
1. Sticky cyber header with brand + nav + CTA
2. Hero: title/subtitle + gateway/agent visual + terminal command block
3. Section 2: Universal Connectivity radial topology
4. Section 3: Model Intelligence Routing panel
5. Section 4: Guardrails-based Agent Security Runtime card grid
6. Cyber-styled Quick Start section preserving existing essential steps
7. Footer with primary outbound links

## Component Architecture
New component set under `src/components/cyber/`:
- `CyberHeader.tsx`
- `CyberHeroGateway.tsx`
- `CyberConnectivityRing.tsx`
- `CyberRoutingPanel.tsx`
- `CyberGuardrailsGrid.tsx`
- `CyberQuickStart.tsx`
- `CyberFooter.tsx`
- `GlowDivider.tsx`
- `NeonCard.tsx`
- `AnimatedNode.tsx`
- `Scanline.tsx`

Composition entry:
- `src/pages/Index.tsx` will switch to a clean section composition using the above components.

## Visual Design System
### Color Tokens
Primary palette (CSS custom properties):
- `--cyber-bg-0`: deep navy-black
- `--cyber-bg-1`: panel navy
- `--cyber-grid`: subtle cyan grid line
- `--cyber-line`: glowing divider cyan
- `--cyber-neon`: primary cyan glow
- `--cyber-neon-2`: electric blue accent
- `--cyber-danger`: red accent for blocked streams
- `--cyber-text`: high-contrast heading text
- `--cyber-muted`: supportive body text

### Typography
- Headings: condensed, technical style (existing web-safe stack fallback if no new font import)
- Body: readable sans stack for contrast and accessibility
- Terminal/code text: monospace stack

### Surface Language
- Framed panel blocks with luminous borders
- Inner glow overlays and subtle noise/grid backdrop
- Thin scan separators and animated divider sweeps
- Rounded corners consistent with screenshot framing

## Motion and Interaction
### Hero Motion
- Animated beam from gateway cube to agent node using SVG path animation.
- Staggered packet dots moving along beam path.
- Node halo pulsing (periodic scale/opacity cycle).

### Section Motion
- Divider line sweep animation between sections.
- Routing panel scanline pass every cycle.
- Guardrail cards: hover lift, edge glow trace, icon pulse/rotate microinteraction.
- Connectivity ring: soft orbit pulse and node emphasis transitions.

### Accessibility and Performance Constraints
- Motion based on `transform` + `opacity` where possible.
- `prefers-reduced-motion` disables non-essential continuous loops.
- Controlled blur usage and reduced particle count on mobile.
- Maintain readable contrast over glow backgrounds.

## Content Mapping Rules
### Keep close to screenshot
- Keep section names and headline cadence aligned to screenshot’s technical framing.
- Keep cyber-terminal command presentation in hero.

### Preserve useful current content
- Quick Start essentials must remain explicit:
  1. Start service (`npx tingly-box@latest`)
  2. Add providers/API keys
  3. Configure routing endpoint
  4. Select active model/provider
- Preserve practical external destinations (GitHub, Releases).
- Preserve interoperability message (OpenAI/Anthropic/Gemini/MCP/External APIs).

## SVG Asset Plan
Create new assets in `public/cyber/`:
- `brand-mark.svg`
- `gateway-cube.svg`
- `agent-node.svg`
- `provider-openai.svg`
- `provider-anthropic.svg`
- `provider-gemini.svg`
- `provider-mcp.svg`
- `provider-external.svg`
- `guardrail-rule.svg`
- `guardrail-analysis.svg`
- `guardrail-audit.svg`

All SVGs will be authored for glow compatibility (strokes, gradients, transparent background) and optimized for inline or `<img>` usage.

## File-Level Plan
Primary modifications:
- `src/pages/Index.tsx` (full composition replacement)
- `src/index.css` (cyber token and utility additions)
- `src/components/cyber/*` (new section components)
- `public/cyber/*.svg` (new icon/logo set)
- `src/components/__tests__/LandingIntegration.test.tsx` (update expectations)
- Add focused tests for quick-start presence and core section rendering.

## Testing Strategy
Automated:
- `npm run test` for component/integration assertions.
- `npm run build` for production bundle validity.
- `npm run lint` for static quality.

Manual:
- Desktop visual parity check against screenshot structure.
- Mobile adaptation check for layout continuity and reduced heavy effects.
- Motion check for hero beam, scanline, card interactions.
- Reduced-motion check.

## Risks and Mitigations
1. Risk: Glow-heavy effects can reduce readability.
- Mitigation: enforce text contrast thresholds and muted glow behind body copy.

2. Risk: Continuous animations can impact low-end devices.
- Mitigation: reduce particle count, interval-driven loops, reduced-motion handling.

3. Risk: Overfitting screenshot can remove practical utility.
- Mitigation: explicit Quick Start retention and practical CTA placement.

## Acceptance Criteria
- `/` fully reflects cyber style and structure from screenshot.
- New SVG icon/logo assets are used (not placeholder/legacy icons).
- Essential Quick Start steps are visible and actionable.
- Header/footer navigation links remain useful.
- Interactive effects are present and performant.
- Tests/build/lint complete without blocking errors.

## Spec Self-Review
### Placeholder scan
No TBD/TODO placeholders remain.

### Internal consistency
Architecture, content mapping, and acceptance criteria align around full replacement at `/` with quick-start retention.

### Scope check
Single redesign subsystem; appropriate for one implementation plan.

### Ambiguity check
Ambiguous points resolved:
- Replacement target is `/` only.
- Screenshot fidelity is prioritized while preserving practical quick-start utility.
- New artwork must be SVG and newly authored.
