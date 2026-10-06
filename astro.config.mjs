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
    // Themed code blocks (if changed, delete .astro/ folder before running)
    expressiveCode({
      themes: ["min-light", "aurora-x"],
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
    }),
  ],
});
