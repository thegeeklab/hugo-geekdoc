const Storage = require("store2")
const { DARK_MODE, THEME, AUTO_MODE } = require("./config.js")

document.addEventListener("DOMContentLoaded", function (event) {
  let lstore = Storage.namespace(THEME)
  let currentMode = lstore.get("color-mode")
  let darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
  let darkMode = false
  let theme = "default"

  if (currentMode === DARK_MODE || (currentMode === AUTO_MODE && darkModeQuery.matches)) {
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
