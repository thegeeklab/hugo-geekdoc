document.addEventListener("DOMContentLoaded", function () {
  // Menu control accessibility
  const menuControl = document.getElementById("menu-control")
  const menuControlLabel = document.querySelector('label[for="menu-control"]')
  const gdocNav = document.querySelector(".gdoc-nav")
  const gdocPage = document.querySelector(".gdoc-page")

  // Menu header control accessibility
  const menuHeaderControl = document.getElementById("menu-header-control")
  const menuHeaderControlLabel = document.querySelector('label[for="menu-header-control"]')

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

  if (menuControl && menuControlLabel) {
    // Set initial accessibility state based on menu state
    updateMenuAccessibility(menuControl.checked)

    // Handle click events
    menuControlLabel.addEventListener("click", function () {
      this.setAttribute("aria-pressed", menuControl.checked)
      updateMenuAccessibility(menuControl.checked)
    })

    // Handle keyboard events for accessibility
    menuControlLabel.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        menuControl.checked = !menuControl.checked
        this.setAttribute("aria-pressed", menuControl.checked)
        updateMenuAccessibility(menuControl.checked)
        event.preventDefault()
      }
    })
  }

  // Menu header control handlers
  if (menuHeaderControl && menuHeaderControlLabel) {
    menuHeaderControlLabel.setAttribute("aria-pressed", menuHeaderControl.checked)

    // Handle click events
    menuHeaderControlLabel.addEventListener("click", function () {
      this.setAttribute("aria-pressed", menuHeaderControl.checked)
    })

    // Handle keyboard events for accessibility
    menuHeaderControlLabel.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        menuHeaderControl.checked = !menuHeaderControl.checked
        this.setAttribute("aria-pressed", menuHeaderControl.checked)
        event.preventDefault()
      }
    })
  }
})
