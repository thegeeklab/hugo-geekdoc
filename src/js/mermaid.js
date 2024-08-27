import Storage from "store2"
import { v4 as uuidv4 } from "uuid"
import { COLOR_THEME_DARK, THEME, COLOR_THEME_AUTO } from "./config.js"

import mermaid from "mermaid"

document.addEventListener("DOMContentLoaded", function () {
  let lstore = Storage.namespace(THEME)
  let currentMode = lstore.get("color-theme") || COLOR_THEME_AUTO
  let darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
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
    theme: theme,
    themeVariables: {
      darkMode: darkMode
    }
  })

  document.querySelectorAll(".mermaid").forEach(function (el) {
    let id = "graph-" + uuidv4()

    mermaid.render(id, el.innerText).then(({ svg, bindFunctions }) => {
      el.innerHTML = svg
      bindFunctions?.(el)
    })
  })
})
