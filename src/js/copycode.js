export function createCopyButton(highlightDiv) {
  const button = document.createElement("span")
  let selector = "pre > code"

  if (highlightDiv.querySelector(".lntable")) {
    selector = ".lntable .lntd:last-child pre > code"
  }

  const codeToCopy = highlightDiv.querySelector(selector).innerText.trim()

  button.classList.add("flex", "align-center", "justify-center", "clip", "gdoc-post__codecopy")
  button.type = "button"
  button.innerHTML =
    '<svg class="icon copy"><use xlink:href="#gdoc_copy"></use></svg>' +
    '<svg class="icon check hidden"><use xlink:href="#gdoc_check"></use></svg>'
  button.setAttribute("data-clipboard-text", codeToCopy)
  button.setAttribute("data-copy-feedback", "Copied!")
  button.setAttribute("role", "button")
  button.setAttribute("aria-label", "Copy")

  highlightDiv.classList.add("gdoc-post__codecontainer")
  highlightDiv.insertBefore(button, highlightDiv.firstChild)
}
