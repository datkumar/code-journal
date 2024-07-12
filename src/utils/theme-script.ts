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
};

const getLocalTheme = () => {
  const locallySavedTheme = localStorage.getItem("theme");
  if (locallySavedTheme !== null) {
    return locallySavedTheme;
  }
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

document.addEventListener("DOMContentLoaded", () => {
  const existingTheme = getLocalTheme() || getSystemTheme();

  if (existingTheme === "dark") {
    // themeCheckbox.checked = true;
    setDarkTheme();
  } else {
    // themeCheckbox.checked = false;
    setLightTheme();
  }

  themeCheckbox.addEventListener("change", (_) => {
    themeCheckbox.checked ? setDarkTheme() : setLightTheme();
  });
});
