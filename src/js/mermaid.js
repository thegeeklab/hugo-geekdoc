import Storage from "store2"
import { v4 as uuidv4 } from "uuid"
import { COLOR_THEME_DARK, THEME, COLOR_THEME_AUTO } from "./config.js"

import mermaid from "mermaid"

document.addEventListener("DOMContentLoaded", () => {
  const lstore = Storage.namespace(THEME)
  const currentMode = lstore.get("color-theme") || COLOR_THEME_AUTO
  const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
  let darkMode = false
  let theme = "default"

  if (
    currentMode === COLOR_THEME_DARK ||
    (currentMode === COLOR_THEME_AUTO && darkModeQuery.matches)
  ) {
    darkMode = true
    theme = "dark"
  }

  mermaid.initialize({
    startOnLoad: false,
    flowchart: { useMaxWidth: true },
    theme,
    themeVariables: {
      darkMode
    }
  })

  document.querySelectorAll(".mermaid").forEach((el) => {
    const id = `graph-${uuidv4()}`

    mermaid.render(id, el.innerText).then(({ svg, bindFunctions }) => {
      el.innerHTML = svg
      bindFunctions?.(el)
    })
  })
})
