import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { mermaid } from "./src/utils/mermaid";
import astroBrokenLinksChecker from "astro-broken-links-checker";

// https://astro.build/config
export default defineConfig({
  site: "https://datkumar.github.io",
  base: "/code-journal",
  markdown: {
    syntaxHighlight: "shiki",
    remarkPlugins: [mermaid, remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    // Check broken links at build-time
    astroBrokenLinksChecker({
      checkExternalLinks: true,
      throwError: false,
      cacheExternalLinks: true,
    }),
    // Syntax Highlighting
    expressiveCode({
      themes: ["light-plus", "aurora-x"],
      // themes: ["min-light", "aurora-x"],
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
