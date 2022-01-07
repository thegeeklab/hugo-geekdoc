const Storage = require("store2")
const { DARK_MODE, THEME, AUTO_MODE } = require("./config.js")

document.addEventListener("DOMContentLoaded", function (event) {
  let lstore = Storage.namespace(THEME)
  let currentMode = lstore.get("color-mode")
  let darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)")
  let primaryColor = "#ececff"
  let darkMode = false

  if (currentMode === DARK_MODE || (currentMode === AUTO_MODE && darkModeQuery.matches)) {
    primaryColor = "#6C617E"
    darkMode = true
  }

  import("mermaid")
    .then(({ default: md }) => {
      md.initialize({
        flowchart: { useMaxWidth: true },
        theme: "base",
        themeVariables: {
          darkMode: darkMode,
          primaryColor: primaryColor
        }
      })
    })
    .catch((error) => console.error(error))
})
