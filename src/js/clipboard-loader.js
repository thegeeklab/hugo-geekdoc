document.addEventListener("DOMContentLoaded", function (event) {
  var clipboard = new ClipboardJS(".clip");

  clipboard.on("success", function (e) {
    const trigger = e.trigger;

    if (trigger.hasAttribute("data-copy-feedback")) {
      trigger.classList.add("gdoc-post__codecopy--success");
      trigger.querySelector(".icon.copy").classList.add("hidden");
      trigger.querySelector(".icon.check").classList.remove("hidden");

      setTimeout(function () {
        trigger.classList.remove("gdoc-post__codecopy--success");
        trigger.querySelector(".icon.copy").classList.remove("hidden");
        trigger.querySelector(".icon.check").classList.add("hidden");
      }, 3000);
    }

    e.clearSelection();
  });
});
