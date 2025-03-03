import Clipboard from "clipboard"
import "./accessibility.js"

document.addEventListener("DOMContentLoaded", function () {
  let clipboard = new Clipboard(".clip")

  clipboard.on("success", function (e) {
    const trigger = e.trigger

    if (trigger.hasAttribute("data-copy-feedback")) {
      trigger.classList.add("gdoc-post__codecopy--success", "gdoc-post__codecopy--out")
      trigger.querySelector(".gdoc-icon.copy").classList.add("hidden")
      trigger.querySelector(".gdoc-icon.check").classList.remove("hidden")

      setTimeout(function () {
        trigger.classList.remove("gdoc-post__codecopy--success", "gdoc-post__codecopy--out")
        trigger.querySelector(".gdoc-icon.copy").classList.remove("hidden")
        trigger.querySelector(".gdoc-icon.check").classList.add("hidden")
      }, 3000)
    }

    e.clearSelection()
  })

  document.querySelectorAll(".highlight").forEach((highlightDiv) => createCopyButton(highlightDiv))
})

function createCopyButton(highlightDiv) {
  const button = document.createElement("span")

  let codeSelector = "pre > code"
  if (highlightDiv.querySelector(".lntable")) {
    codeSelector = ".lntable .lntd:last-child pre > code"
  }

  const codeContainer = highlightDiv.querySelector(codeSelector)
  if (codeContainer !== null) {
    const codeContent = codeContainer.innerText.trim()

    button.classList.add("flex", "align-center", "justify-center", "clip", "gdoc-post__codecopy")
    button.type = "button"
    button.innerHTML =
      '<svg class="gdoc-icon copy"><use xlink:href="#gdoc_copy"></use></svg>' +
      '<svg class="gdoc-icon check hidden"><use xlink:href="#gdoc_check"></use></svg>'
    button.setAttribute("data-clipboard-text", codeContent)
    button.setAttribute("data-copy-feedback", "Copied!")
    button.setAttribute("role", "button")
    button.setAttribute("aria-label", "Copy")

    highlightDiv.classList.add("gdoc-post__codecontainer")
    highlightDiv.insertBefore(button, highlightDiv.firstChild)
  }
}
