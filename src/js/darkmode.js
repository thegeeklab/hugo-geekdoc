const Storage = require("store2")

const { TOGGLE_MODES, THEME, AUTO_MODE } = require("./config.js")

document.addEventListener("DOMContentLoaded", (event) => {
  const darkModeToggle = document.getElementById("gdoc-dark-mode")

  darkModeToggle.onclick = function () {
    let lstore = Storage.namespace(THEME)
    let currentMode = lstore.get("color-mode")
    let nextMode = toggle(TOGGLE_MODES, currentMode)

    lstore.set("color-mode", TOGGLE_MODES[nextMode])
    applyTheme(false)
  }
})

export function applyTheme(init = true) {
  if (Storage.isFake()) return

  let lstore = Storage.namespace(THEME)
  let html = document.documentElement
  let currentMode = TOGGLE_MODES.includes(lstore.get("color-mode"))
    ? lstore.get("color-mode")
    : AUTO_MODE

  html.setAttribute("class", "color-toggle-" + currentMode)
  lstore.set("color-mode", currentMode)

  if (currentMode === AUTO_MODE) {
    html.removeAttribute("color-mode")
  } else {
    html.setAttribute("color-mode", currentMode)
  }

  if (!init) {
    // Reload required to re-initialise e.g. Mermaid with the new theme
    // and re-parse the Mermaid code blocks.
    location.reload()
  }
}

function toggle(list = [], value) {
  let current = list.indexOf(value)
  let max = list.length - 1
  let next = 0

  if (current < max) {
    next = current + 1
  }

  return next
}
