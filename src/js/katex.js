import "katex/dist/katex.css"

document.addEventListener("DOMContentLoaded", function () {
  import("katex/dist/contrib/auto-render")
    .then(({ default: renderMathInElement }) => {
      renderMathInElement(document.body)
    })
    .catch((error) => console.error(error))
})
