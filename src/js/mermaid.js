const Storage = require("store2")
const { COLOR_THEME_DARK, THEME, COLOR_THEME_AUTO } = require("./config.js")

document.addEventListener("DOMContentLoaded", function (event) {
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

  import("mermaid")
    .then(({ default: md }) => {
      md.initialize({
        flowchart: { useMaxWidth: true },
        theme: theme,
        themeVariables: {
          darkMode: darkMode
        }
      })
    })
    .catch((error) => console.error(error))
})
