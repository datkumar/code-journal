import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import { mermaid } from "./src/utils/mermaid";

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
      // themes: ["catppuccin-latte", "aurora-x"],
      themes: ["slack-ochin", "aurora-x"],
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      styleOverrides: {
        codeFontFamily: "ui-monospace, monospace",
        uiFontFamily: "ui-monospace, monospace",
        uiFontWeight: "600",
        uiFontSize: "medium",
      },
    }),
  ],
});
