// Referred from this issue:
// https://github.com/withastro/astro/issues/4433

async function renderDiagrams(graphs: HTMLCollectionOf<Element>) {
  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    startOnLoad: false,
    fontFamily: "monospace",
    // Only "base" theme can be modified
    theme: "base",
    themeVariables: {
      lineColor: "#0f755f",
      primaryColor: "#eae3fc",
    },
  });

  for (const graph of graphs) {
    const content = graph.getAttribute("data-content");
    if (!content) {
      continue;
    }
    let svg = document.createElement("svg");
    const id = (svg.id = "mermaid-" + Math.round(Math.random() * 100000));
    graph.appendChild(svg);
    mermaid.render(id, content).then((result: any) => {
      graph.innerHTML = result.svg;
    });
  }
}

const initializeMermaid = () => {
  const graphs = document.getElementsByClassName("mermaid");
  if (document.getElementsByClassName("mermaid").length > 0) {
    renderDiagrams(graphs);
  }
};

// Re-init mermaid before loading new page during navigation
document.addEventListener("astro:after-swap", initializeMermaid);

// Init mermaid on page load
document.addEventListener("astro:page-load", initializeMermaid);
