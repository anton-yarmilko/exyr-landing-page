# Exyr landing page

Production-ready responsive implementation of the public Exyr landing-page concept.

- Live production: https://exyr-landing-anton.rikishini.chatgpt.site/
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

The verification command runs ESLint, logic tests, the production build, Sites packaging checks, SPA fallback tests, and security-header assertions. The build emits both a Vite client bundle and the Sites worker packaging files.

The source template intentionally contains placeholder marketing copy and store destinations. Replace those values before using this as the official Exyr product site. The contact CTA prepares an email draft to `support@exyr.io` and never claims a silent backend signup.

Sites currently serves this as a public static deployment. Because its CDN does not forward the Worker response headers for static assets, the document includes a strict CSP meta fallback; the Worker and `_headers` policy remain in the repository for hosts that support them.

## Design source

- [Figma design](https://www.figma.com/design/S7qaUxxHZ21fEpzwPrlFYx/Exyr.io---Landing-Page--Template----App)
- [Original case study by the template author](https://dribbble.com/shots/26048233-exyr-io-Landing-Page-App-Template-Case-Study)

The implementation uses original code plus locally generated decorative raster assets. Verify the source design's license and your usage rights before commercial redistribution.
