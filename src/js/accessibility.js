document.addEventListener("DOMContentLoaded", function () {
  // Find all elements with role="button"
  const buttonRoleElements = document.querySelectorAll('[role="button"]')

  const gdocNav = document.querySelector(".gdoc-nav")
  const gdocPage = document.querySelector(".gdoc-page")

  buttonRoleElements.forEach((buttonElement) => {
    // Check if this button controls a checkbox
    const controlId = buttonElement.parentElement.getAttribute("for")
    if (!controlId) return

    const controlElement = document.getElementById(controlId)
    if (!controlElement || controlElement.type !== "checkbox") return

    // Set initial accessibility state
    buttonElement.setAttribute("aria-pressed", controlElement.checked)

    if (controlId === "menu-control" && gdocNav && gdocPage) {
      updateMenuAccessibility(controlElement.checked)
    }

    buttonElement.addEventListener("click", function () {
      this.setAttribute("aria-pressed", controlElement.checked)

      if (controlId === "menu-control" && gdocNav && gdocPage) {
        updateMenuAccessibility(controlElement.checked)
      }
    })

    buttonElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        controlElement.checked = !controlElement.checked
        this.setAttribute("aria-pressed", controlElement.checked)

        if (controlId === "menu-control" && gdocNav && gdocPage) {
          updateMenuAccessibility(controlElement.checked)
        }

        event.preventDefault()
      }
    })
  })

  // Helper function for menu navigation accessibility
  function updateMenuAccessibility(isMenuOpen) {
    if (!gdocNav || !gdocPage) return

    if (isMenuOpen) {
      gdocNav.removeAttribute("inert")
      gdocNav.setAttribute("aria-hidden", false)

      gdocPage.setAttribute("inert", "")
      gdocPage.setAttribute("aria-hidden", true)
    } else {
      gdocNav.setAttribute("inert", "")
      gdocNav.setAttribute("aria-hidden", true)

      gdocPage.removeAttribute("inert")
      gdocPage.setAttribute("aria-hidden", false)
    }
  }
})
