export function createCopyButton(highlightDiv) {
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
