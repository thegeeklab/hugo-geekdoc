function createCopyButton(highlightDiv) {
  const button = document.createElement("button");

  if (highlightDiv.querySelector(".lntable")) {
    selector = ".lntable .lntd:last-child pre > code";
  } else {
    selector = "pre > code";
  }

  const codeToCopy = highlightDiv.querySelector(selector).innerText;

  button.classList.add("clip", "gdoc-post__codecopy");
  button.type = "button";
  button.innerText = "Copy";
  button.setAttribute("data-clipboard-text", codeToCopy);

  highlightDiv.classList.add("gdoc-post__codecontainer");
  highlightDiv.insertBefore(button, highlightDiv.firstChild);
}

document
  .querySelectorAll(".highlight")
  .forEach((highlightDiv) => createCopyButton(highlightDiv));
