// References:
// https://docs.mathjax.org/en/latest/web/configuration.html#local-configuration-file
// https://docs.mathjax.org/en/latest/input/tex/extensions/autoload.html#tex-autoload

// MathJax config
let MyMathJax = {
  loader: {
    load: ["[tex]/boldsymbol", "[tex]/cases"],
  },
  tex: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    packages: {
      "[+]": ["boldsymbol", "cases"],
    },
  },
  svg: {
    fontCache: "global",
  },
};

const scriptId = "MathJax-script"; // Prevent duplicate scripts
const scriptSource = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
// "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
// "https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js";

const initializeMathJax = () => {
  // @ts-ignore
  window.MathJax = MyMathJax;

  // Create and append MathJax script dynamically
  const script = document.createElement("script");
  script.src = scriptSource;
  script.async = true;
  document.head.appendChild(script);

  // Re-typeset MathJax when the page is ready
  script.onload = async () => {
    // @ts-ignore
    await MyMathJax.typesetClear();
    // @ts-ignore
    await MathJax.typesetPromise();
  };
};

// Reapply MathJax after Astro swaps the page
document.addEventListener("astro:after-swap", initializeMathJax);

// Init MathJax on page load
document.addEventListener("astro:page-load", initializeMathJax);

// interface Window {
//   MathJax?: {
//     Hub?: {
//       Queue?: (...args: any[]) => void;
//     };
//     typesetPromise?: () => Promise<void>;
//     [key: string]: any;
//   };
//   MathJaxInitialized?: boolean;
//   MathJaxListenersSet?: boolean;
// }

// const initializeMathJax = async (): Promise<void> => {
//   // Check if MathJax is already initialized
//   if (document.getElementById("MathJax-script")) {
//     console.log("MathJax already loaded.");
//     // @ts-ignore
//     if (window.MathJax && typeof MathJax.typesetPromise === "function") {
//       console.log("clearing and setting mathjax");
//       // @ts-ignore
//       MathJax.typesetClear();
//       // @ts-ignore
//       await MathJax.typesetPromise();
//     }
//     return;
//   }

//   // Configure MathJax
//   // @ts-ignore
//   window.MathJax = MyMathJax;

//   // Dynamically load the MathJax script
//   try {
//     await loadMathJaxScript();
//     console.log("MathJax script loaded successfully.");

//     // @ts-ignore
//     if (window.MathJax && typeof MathJax.typesetPromise === "function") {
//       console.log("clearing and setting mathjax AGAIN");
//       // @ts-ignore
//       MathJax.typesetClear();
//       // @ts-ignore
//       await MathJax.typesetPromise();
//       console.log("MathJax typeset complete.");
//     } else {
//       console.error("MathJax.typesetPromise is not available.");
//     }
//   } catch (error) {
//     console.error("Error loading MathJax script:", error);
//   }
// };

// // Helper function to load the MathJax script
// const loadMathJaxScript = async (): Promise<void> => {
//   return new Promise<void>((resolve, reject) => {
//     const script = document.createElement("script");
//     script.id = scriptId;
//     script.src = scriptSource;
//     script.async = true;
//     console.log("script set");
//     script.onload = () => {
//       console.log("inside resolve()");
//       resolve();
//     };
//     script.onerror = () => {
//       reject(new Error("Failed to load MathJax script."));
//     };
//     document.head.appendChild(script);
//   });
// };

// // Reapply MathJax after Astro swaps the page
// document.addEventListener("astro:after-swap", async () => {
//   console.log("inside after:swap");
//   await initializeMathJax();
// });

// // Init MathJax on page load
// document.addEventListener("astro:page-load", async () => {
//   console.log("inside page-load");
//   await initializeMathJax();
// });
