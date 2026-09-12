import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [
    react(),
    {
      name: "dev-csp-for-vite-styles",
      apply: "serve",
      transformIndexHtml(html) {
        return html.replace("style-src 'self';", "style-src 'self' 'unsafe-inline';");
      },
    },
  ],
});
