import { unified } from "@astrojs/markdown-remark";
import astroBrokenLinksChecker from "astro-broken-links-checker";
import expressiveCode from "astro-expressive-code";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { mermaid } from "./src/utils/mermaid";

// https://astro.build/config
export default defineConfig({
  site: "https://datkumar.github.io",
  base: "/code-journal",
  markdown: {
    syntaxHighlight: "shiki",
    processor: unified({
      // markdown processor
      remarkPlugins: [mermaid, remarkMath],
      // HTML processor
      rehypePlugins: [rehypeKatex],
    }),
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
      themes: ["min-light", "aurora-x"],
      // themes: ["light-plus", "aurora-x"],
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
