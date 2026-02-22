import Storage from "store2"
import { TOGGLE_COLOR_THEMES, THEME, COLOR_THEME_AUTO } from "./config.js"

const applyTheme = (init = true) => {
  if (Storage.isFake()) return

  const lstore = Storage.namespace(THEME)
  const html = document.documentElement
  const currentColorTheme = TOGGLE_COLOR_THEMES.includes(lstore.get("color-theme"))
    ? lstore.get("color-theme")
    : COLOR_THEME_AUTO

  html.setAttribute("class", `color-toggle-${currentColorTheme}`)

  if (currentColorTheme === COLOR_THEME_AUTO) {
    html.removeAttribute("color-theme")
  } else {
    html.setAttribute("color-theme", currentColorTheme)
  }

  if (!init) {
    // Reload required to re-initialize e.g. Mermaid with the new theme
    // and re-parse the Mermaid code blocks.
    location.reload()
  }
}

const toggle = (value, list = []) => {
  const current = list.indexOf(value)
  const max = list.length - 1
  let next = 0

  if (current < max) {
    next = current + 1
  }

  return next
}

;(() => {
  applyTheme()
})()

document.addEventListener("DOMContentLoaded", () => {
  const colorThemeToggle = document.getElementById("gdoc-color-theme")

  const toggleColorTheme = () => {
    const lstore = Storage.namespace(THEME)
    const currentColorTheme = lstore.get("color-theme") || COLOR_THEME_AUTO
    const nextColorTheme = toggle(currentColorTheme, TOGGLE_COLOR_THEMES)

    lstore.set("color-theme", TOGGLE_COLOR_THEMES[nextColorTheme])
    applyTheme(false)
  }

  colorThemeToggle.onclick = () => {
    toggleColorTheme()
  }

  colorThemeToggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      toggleColorTheme()
      event.preventDefault()
    }
  })
})
