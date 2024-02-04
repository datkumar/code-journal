import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import { mermaid } from "./src/plugins/mermaid.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://datkumar.github.io",
  base: "/code-journal",
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [mermaid],
  },
  integrations: [
    expressiveCode({
      themes: ["one-dark-pro"],
      styleOverrides: {
        uiFontFamily: "monospace",
        uiFontWeight: "600",
        uiFontSize: "medium",
      },
    }),
  ],
});
