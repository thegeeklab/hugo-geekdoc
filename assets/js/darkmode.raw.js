const DARK_MODE = "dark";
const LIGHT_MODE = "light";
const AUTO_MODE = "auto";
const THEME = "hugo-geekdoc";

const TOGGLE_ELEMENT = "gdoc-dark-mode";
const TOGGLE_MODES = [AUTO_MODE, DARK_MODE, LIGHT_MODE];

document.addEventListener("DOMContentLoaded", (event) => {
  const darkModeToggle = document.getElementById(TOGGLE_ELEMENT);

  (applyTheme = function (init = true) {
    let html = document.documentElement;
    let currentMode = TOGGLE_MODES.includes(localStorage.getItem(THEME))
      ? localStorage.getItem(THEME)
      : AUTO_MODE;

    localStorage.setItem(THEME, currentMode);

    darkModeToggle.setAttribute("class", "toggle-" + currentMode);

    let darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (currentMode === AUTO_MODE) {
      html.removeAttribute("color-mode");
    } else {
      html.setAttribute("color-mode", currentMode);
    }

    if (!init) {
      // Reload required to re-initialise e.g. Mermaid with the new theme and re-parse the Mermaid code blocks.
      location.reload();
    }
  })();

  darkModeToggle.onclick = function () {
    let currentMode = localStorage.getItem(THEME);
    let nextMode = toggle(TOGGLE_MODES, currentMode);

    localStorage.setItem(THEME, TOGGLE_MODES[nextMode]);
    applyTheme(true);
  };
});

function toggle(list = [], value) {
  console.log("Toggle value:", value);
  current = list.indexOf(value);
  console.log("Toggle current:", current, list[current]);
  max = list.length - 1;
  next = 0;

  if (current < max) {
    next = current + 1;
  }

  console.log("Toggle next:", next, list[next]);
  return next;
}
