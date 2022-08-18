const Storage = require("store2")
const { COLOR_THEME_DARK, THEME, COLOR_THEME_AUTO } = require("./config.js")

document.addEventListener("DOMContentLoaded", function (event) {
  let lstore = Storage.namespace(THEME)
  let currentMode = lstore.get("color-theme")
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
      // Configure mermaid with matching color scheme
      md.initialize({
        flowchart: { useMaxWidth: true },
        theme: theme,
        themeVariables: {
          darkMode: darkMode
        }
      })

      // Render mermaid from shortcodes and code fences
      md.init(undefined, ".mermaid,.language-mermaid", (id) => {
        // Fix height of mermaid SVG elements (see https://github.com/mermaid-js/mermaid/issues/2481)
        document.getElementById(id).setAttribute("height", "100%")
      })
    })
    .catch((error) => console.error(error))
})
