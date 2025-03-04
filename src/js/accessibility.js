document.addEventListener("DOMContentLoaded", function () {
  const gdocNav = document.querySelector(".gdoc-nav")
  const gdocPage = document.querySelector(".gdoc-page")
  const menuControl = document.getElementById("menu-control")

  // Helper function for menu navigation accessibility
  function updateMenuAccessibility() {
    if (!gdocNav || !gdocPage || !menuControl) return

    const isMenuOpen = menuControl.checked
    const isDesktop = window.matchMedia("(min-width: 41rem)").matches

    // Set nav accessibility attributes
    gdocNav.toggleAttribute("inert", !isDesktop && !isMenuOpen)
    gdocNav.setAttribute("aria-hidden", (!isDesktop && !isMenuOpen).toString())

    // Set page accessibility attributes
    gdocPage.toggleAttribute("inert", !isDesktop && isMenuOpen)
    gdocPage.setAttribute("aria-hidden", (!isDesktop && isMenuOpen).toString())
  }

  // Process all button role elements
  document.querySelectorAll('[role="button"]').forEach((buttonElement) => {
    const controlId = buttonElement.parentElement?.getAttribute("for")
    if (!controlId) return

    const controlElement = document.getElementById(controlId)
    if (!controlElement || controlElement.type !== "checkbox") return

    // Set initial accessibility state
    buttonElement.setAttribute("aria-pressed", controlElement.checked)

    // Handle accessibility updates
    const updateButton = () => {
      buttonElement.setAttribute("aria-pressed", controlElement.checked)
      if (controlId === "menu-control") updateMenuAccessibility()
    }

    // Event listeners
    buttonElement.addEventListener("click", updateButton)
    buttonElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        controlElement.checked = !controlElement.checked
        updateButton()
        event.preventDefault()
      }
    })
  })

  // Initial call and resize handler
  updateMenuAccessibility()
  window.addEventListener("resize", updateMenuAccessibility)
})
