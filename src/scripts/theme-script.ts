const rootElement = document.documentElement;
const themeCheckbox = document.getElementById(
  "theme-toggle"
) as HTMLInputElement;

const getSystemTheme = () => {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  if (window.matchMedia("(prefers-color-scheme: light)").matches) {
    return "light";
  }
  return null;
};

const getLocalTheme = () => {
  const locallySavedTheme = localStorage.getItem("theme");
  if (locallySavedTheme) {
    return locallySavedTheme;
  }
  return null;
};

const setDarkTheme = () => {
  themeCheckbox.checked = true;
  rootElement.setAttribute("data-theme", "dark");
  localStorage.setItem("theme", "dark");
};
const setLightTheme = () => {
  themeCheckbox.checked = false;
  rootElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
};

const applyTheme = () => {
  const existingTheme = getLocalTheme() || getSystemTheme() || "light";
  if (existingTheme === "dark") setDarkTheme();
  else setLightTheme();
};

// Set theme on page load
document.addEventListener("astro:page-load", () => {
  // Set theme as per previous prefs
  applyTheme();
  // Change theme if slider pressed
  themeCheckbox.addEventListener("change", (_) => {
    themeCheckbox.checked ? setDarkTheme() : setLightTheme();
  });
});

// Reapply theme after Astro swaps the page during page navigations
document.addEventListener("astro:after-swap", applyTheme);
