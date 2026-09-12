# Exyr production audit

Audit date: 2026-09-12 (Europe/Kyiv)

## Release verdict

Ready for a static production deployment as an honest early-access product concept. No release-blocking P0, P1, or P2 issue remains in the implementation, browser flows, build, dependency tree, or shipped asset set.

## User-journey audit

1. Landing and hero: healthy. The intro exits, the primary actions are visible, and the product status is described as early access.
2. Navigation: healthy. Twenty-four internal links were checked and every target exists.
3. Product preview: healthy. Devices and Sessions behave as keyboard-accessible tabs and update the visible panel.
4. Features and resources: healthy. Content is original, realistic, and does not claim unsupported integrations or customers.
5. Pricing: healthy. Monthly and annual states update correctly and explain the annual billing total; pricing is explicitly planned.
6. Conversion: healthy. Free and Pro selection reaches the contact form. Invalid input is announced and focused; valid input opens a reviewable plan-specific email draft.
7. FAQ and legal: healthy. Native disclosures, Privacy, and Beta terms are reachable without a separate router.
8. Responsive behavior: healthy at 1280 x 780 and 375 x 812. No horizontal overflow, persistent clipping, or overlapping controls was observed.
9. Motion and accessibility: healthy for the audited scope. Reduced motion, visible focus, semantic landmarks, labeled controls, skip navigation, and an inert closed mobile menu are implemented.

## Engineering and security checks

- ESLint: passed.
- Node logic/content tests: passed.
- Vite production build: passed.
- Sites worker/packaging tests: passed, including a real 404 for unknown paths.
- Dependency audit (production and full tree): no known vulnerabilities at audit time.
- Secret review: no credential pattern was found in tracked source or bounded Git history; no scanner output containing candidate values was retained.
- Public build boundary: the Figma reference and QA captures stay outside `public/` and `dist/client`; the removed source crop is not shipped.
- Browser console: a fresh local load produced 0 warnings and 0 errors.

Exact command output and deployment checks are rerun immediately before release; the final commit and public deployment are the release evidence of record.

## Evidence

- `design-qa.md`
- `qa/final-desktop-1280x780.png`
- `qa/final-mobile-375x812.png`
- `qa/source-implementation-comparison-final.png`

## Known boundaries

- This is a static early-access site. It does not include an account backend, payments, a live VPN service, or published Android/macOS applications.
- The contact action depends on the visitor having an email client configured; the UI states this before submission.
- Sites' static CDN does not currently forward the Worker response security headers on the canonical asset route. The HTML contains CSP/referrer meta fallbacks, while Worker and `_headers` policies remain ready for compatible hosts. Meta CSP cannot provide `frame-ancestors`, so anti-framing at the HTTP layer remains a hosting-platform limitation.
- An example CI workflow is documented but not active because the available GitHub credential cannot update workflow files.
- This audit is not a formal WCAG conformance certification or penetration test.
- Confirm the Figma template license before commercial redistribution of the overall visual composition.
