const initializeMathJax = () => {
  // MathJax config
  // @ts-ignore
  window.MathJax = {
    loader: { load: ["[tex]/boldsymbol"] },
    tex: {
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"],
      ],
      packages: { "[+]": ["boldsymbol"] },
    },
    svg: {
      fontCache: "global",
    },
  };

  // Create and append MathJax script dynamically
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.async = true;
  document.head.appendChild(script);

  // Re-typeset MathJax when the page is ready
  script.onload = async () => {
    // @ts-ignore
    await MathJax.typesetPromise();
  };
};

// Reapply MathJax after Astro swaps the page
document.addEventListener("astro:after-swap", initializeMathJax);

// Init MathJax on page load
document.addEventListener("astro:page-load", initializeMathJax);
