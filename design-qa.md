# Exyr design QA

## Comparison target

- Source visual truth: `qa/figma-hero-reference.png`, retained locally for QA only and excluded from the public build.
- Source URL: https://www.figma.com/design/S7qaUxxHZ21fEpzwPrlFYx/Exyr.io---Landing-Page--Template----App
- Local implementation: `http://127.0.0.1:4173/`
- Desktop evidence: `qa/final-desktop-1280x780.png`
- Mobile evidence: `qa/final-mobile-375x812.png`
- Combined evidence: `qa/source-implementation-comparison-final.png`, rendered from `qa-compare.html`.

## Normalization

- Source crop: 820 x 560 pixels from the public author case study.
- Desktop implementation: 1280 x 780 CSS pixels at device scale 1.
- Mobile implementation: 375 x 812 CSS pixels at device scale 1.
- Captures were taken at 2x and normalized to the exact CSS viewport dimensions before review.
- The combined 1280 x 720 comparison places the reference and implementation together at equivalent visual scale.

## Findings

- No actionable P0, P1, or P2 visual defect remains.
- Typography: self-hosted Inter preserves the source's neutral grotesk character, compact labels, and restrained hierarchy.
- Layout: the centered desktop shell, 20 px surfaces, hero proportions, section rhythm, responsive grids, and 375 px stacking match the reference language without horizontal overflow.
- Color: white, graphite, pale blue-gray, muted purple, borders, and focus tokens preserve the source's visual balance without gradient substitutes.
- Assets: the shipped phone-pair artwork is an original ImageGen asset. Rings and map artwork are original generated rasters fitted to measured slots. Interface and ecosystem symbols use Phosphor icons.
- Content: placeholder copy, fake ratings, unsupported customer claims, and false store-download language were intentionally replaced with original early-access copy. This is a product-truth improvement, not an unresolved fidelity defect.
- Accessibility: semantic landmarks, native anchors, labeled controls, visible focus, minimum practical tap targets, live validation feedback, skip navigation, reduced-motion behavior, and an inert hidden mobile menu are present.

## Comparison history

1. Corrected the desktop hero heading size and restored the dark header CTA after the first combined comparison.
2. Corrected mobile heading wrapping and verified the complete 375 px hero without persistent clipping or overlap.
3. Replaced source-derived phone artwork with an original generated product illustration and moved the Figma reference outside `public/`.
4. Replaced all template filler and unsupported claims with truthful early-access content while preserving the supplied hierarchy and visual system.
5. Repeated desktop, mobile, and combined review; no P0, P1, or P2 mismatch remains.

## Primary interactions tested

- Intro animation completes and reveals the page; reduced-motion users bypass non-essential movement.
- All 24 internal anchor links resolve to real targets.
- Desktop and mobile navigation reach the requested sections.
- Mobile navigation exposes its destinations, closes with Escape, becomes inert when hidden, and returns focus to the menu button.
- Devices and Sessions are functional tabs with updated panel content.
- Billing switches between `$15` monthly and `$12` per month billed as `$144` annually; both states are labeled planned beta pricing.
- Choose Pro selects the Pro request option and navigates to `#contact`.
- Empty contact submission focuses the email field, sets `aria-invalid`, and announces `Enter your work email.`
- A valid submission prepares a plan-specific `mailto:` draft for review; nothing is sent silently.
- FAQ disclosures open natively; privacy and beta-terms anchors resolve.
- A fresh local browser session produced 0 warnings and 0 errors; Vite debug/info messages were informational only.

## Implementation checklist

- [x] Desktop visual comparison at the source hero state.
- [x] Mobile layout, menu, and keyboard dismissal at 375 x 812.
- [x] Loader, reveal, float, pulse, marquee, and reduced-motion behavior.
- [x] Native navigation, tabs, pricing, plan selection, validation, FAQ, and legal surfaces.
- [x] Original production copy and original shipped image assets.
- [x] Production build, true 404 behavior, packaging checks, and dependency audit.

final result: passed
