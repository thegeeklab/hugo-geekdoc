const { createCopyButton } = require("./copycode.js")
const Clipboard = require("clipboard")

document.addEventListener("DOMContentLoaded", function (event) {
  let clipboard = new Clipboard(".clip")

  clipboard.on("success", function (e) {
    const trigger = e.trigger

    if (trigger.hasAttribute("data-copy-feedback")) {
      trigger.classList.add("gdoc-post__codecopy--success")
      trigger.querySelector(".gdoc-icon.copy").classList.add("hidden")
      trigger.querySelector(".gdoc-icon.check").classList.remove("hidden")

      setTimeout(function () {
        trigger.classList.remove("gdoc-post__codecopy--success")
        trigger.querySelector(".gdoc-icon.copy").classList.remove("hidden")
        trigger.querySelector(".gdoc-icon.check").classList.add("hidden")
      }, 3000)
    }

    e.clearSelection()
  })

  document.querySelectorAll(".highlight").forEach((highlightDiv) => createCopyButton(highlightDiv))
})
