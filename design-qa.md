# Exyr design QA

**Comparison target**

- Source visual truth: `public/qa/figma-hero-reference.png`, cropped from the public author case study for the supplied Figma file.
- Source URL: https://www.figma.com/design/S7qaUxxHZ21fEpzwPrlFYx/Exyr.io---Landing-Page--Template----App
- Implementation: `http://127.0.0.1:4173/`
- Desktop implementation screenshot: `qa/implementation-desktop-1280x780.jpg`
- Mobile implementation screenshot: `qa/implementation-mobile-375x812.jpg`
- Combined source/implementation evidence: `qa/source-implementation-comparison-1280x720.jpg`, rendered from `qa-compare.html`.
- Desktop state: loaded landing-page hero after the intro animation; monthly pricing is the default.
- Mobile state: loaded hero at 375 CSS px; mobile menu, pricing navigation, toggle, and contact-form states were tested separately.

**Normalization**

- Source crop: 820 × 560 pixels from the public 1600 × 3835 case-study image.
- Implementation desktop evidence: 1280 × 780 pixels at a 1280 CSS px viewport, device scale 1.
- Implementation mobile evidence: 375 × 812 pixels at a 375 CSS px viewport, device scale 1.
- The combined QA page displays the source and a 1280 px live implementation iframe at equivalent visual scale, without browser chrome.

**Findings**

- No actionable P0, P1, or P2 differences remain.
- Typography: self-hosted Inter matches the source's neutral grotesk character; hero size, weight, wrapping, body contrast, and compact UI labels were checked on desktop and mobile.
- Spacing and layout: 1080 px desktop shell, 20 px surfaces, header rhythm, hero proportions, section order, responsive grids, and 375 px stacking preserve the supplied design hierarchy without horizontal overflow.
- Colors and tokens: white, graphite, pale blue-gray, restrained purple, border, and muted-text tokens match the source's visual balance; no gradient substitutes are used.
- Image quality and assets: the phone pair is cropped from the supplied public visual source; rings and map are production raster assets generated to the measured slots; branded connectors use Simple Icons and interface controls use Phosphor icons.
- Copy/content: source placeholder copy and section hierarchy are preserved rather than inventing a different marketing narrative.
- Accessibility: semantic navigation, labels, alt text, focus-visible outlines, minimum practical tap targets, live form feedback, and reduced-motion behavior are present.

**Comparison history**

1. First combined comparison found a P2 hero typography mismatch: the desktop heading rendered substantially larger than the source. Fixed `h1` to the measured 32 px desktop size and rechecked the hero.
2. Browser QA found a P2 header CTA regression: a higher-specificity reset made the Contacts button background transparent. Scoped the reset to non-CTA navigation buttons and verified the restored graphite button.
3. Mobile QA found a P2 text-wrap issue caused by a hidden desktop line break. Added explicit whitespace and reduced the mobile hero size; the 375 px capture now wraps cleanly.
4. Post-fix desktop and mobile captures show no overlapping controls, broken wrapping, cropped persistent UI, or remaining P0/P1/P2 fidelity issue.

**Primary interactions tested**

- Intro loader completes and reveals the page.
- Desktop navigation scrolls to Products.
- Mobile menu opens, exposes all destinations, navigates to Pricing and closes.
- Pricing toggle changes Pro from `$15` monthly to `$12` annual.
- Empty contact form returns `Enter your work email.`
- Valid local QA input prepares a `mailto:` draft so the visitor can review it before sending; no silent signup is claimed.
- Browser console checked after desktop, mobile, and form flows: 0 errors, 0 warnings.

**Implementation Checklist**

- [x] Desktop visual comparison at the source hero state.
- [x] 375 px mobile layout and menu.
- [x] Loader, reveal, float, pulse, marquee, and reduced-motion behavior.
- [x] Pricing and contact validation states.
- [x] Production build, worker fallback, headers, and dependency audit.

**Follow-up Polish**

- P3: replace lorem-ipsum marketing copy and placeholder store destinations when production content and final app-store URLs are supplied.

final result: passed
