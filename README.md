# Exyr landing page

Independent non-commercial portfolio implementation of the public Exyr landing-page concept by Anton Yarmilko: a responsive React/Vite website with illustrative product copy and a reviewable email-inquiry flow. It is not a released remote-access service.

- Live demo: https://exyr-anton.pages.dev/
- Source: https://github.com/anton-yarmilko/exyr-landing-page

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
npm audit --omit=dev
```

The verification command runs ESLint, content/logic tests, the production build, Sites packaging checks, true-404 tests, and security-header assertions. The build emits both a Vite client bundle and the Sites worker packaging files.

The page visibly identifies this as Anton Yarmilko's independent, non-commercial portfolio concept. Platform labels and prices are illustrative, not a working remote-access service or subscriptions. The contact CTA prepares a plan-specific portfolio inquiry to `taboopip@gmail.com`; no beta registration, purchase or silent backend signup occurs.

The live demo is hosted on Cloudflare Pages with automatic deployments from GitHub `main`. HTTP checks on 2026-10-05 confirmed the CSP (including `frame-ancestors 'none'`), anti-framing, MIME-sniffing, referrer and permissions headers. The document-level CSP fallback and existing Sites packaging remain supported. A push to `main` updates the public demo, so review and version changes before pushing.

## Design source

- [Figma design](https://www.figma.com/design/S7qaUxxHZ21fEpzwPrlFYx/Exyr.io---Landing-Page--Template----App)
- [Original case study by the template author](https://dribbble.com/shots/26048233-exyr-io-Landing-Page-App-Template-Case-Study)

The implementation uses original code plus locally generated raster assets, including the light/dark product-screen illustration. Confirm the source design's license before commercial redistribution of the overall visual composition.

## Portfolio notice

This is an independent, non-commercial design implementation created for learning and portfolio demonstration. It does not claim commercial affiliation with the original template author or represent Exyr as a released service.
