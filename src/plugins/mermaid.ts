// Referred from:
// https://github.com/JuanM04/portfolio/blob/b312b44e08558bc72b5c8cb15f2ee32c3349d277/src/plugins/mermaid.ts

import type { RemarkPlugin } from "@astrojs/markdown-remark";
import { visit } from "unist-util-visit";

const escapeMap: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => escapeMap[c]);

export const mermaid: RemarkPlugin<[]> = () => (tree: any) => {
  visit(tree, "code", (node) => {
    if (node.lang !== "mermaid") return;

    // @ts-ignore
    node.type = "html";
    node.value = `<div class="mermaid" data-content="${escapeHtml(
      node.value
    )}"><p>Loading graph...</p></div>`;
  });
};
