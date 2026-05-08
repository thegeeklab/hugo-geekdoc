import "katex/dist/katex.css"
import renderMathInElement from "katex/dist/contrib/auto-render.mjs"

document.addEventListener("DOMContentLoaded", () => {
  renderMathInElement(document.body, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false }
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
    throwOnError: false
  })
})
