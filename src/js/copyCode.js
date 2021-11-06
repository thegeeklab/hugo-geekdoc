function createCopyButton(highlightDiv) {
  const button = document.createElement("button");

  if (highlightDiv.querySelector(".lntable")) {
    codeText = highlightDiv.querySelector(
      ".lntable .lntd:last-child pre > code"
    ).innerText;
  } else {
    codeText = highlightDiv.querySelector("pre > code").innerText;
  }

  const codeToCopy = codeText;

  button.classList.add("clip", "gdoc-post__codecopy");
  button.type = "button";
  button.innerText = "Copy";
  button.setAttribute("data-clipboard-text", codeToCopy);

  highlightDiv.insertBefore(button, highlightDiv.firstChild);
}

document
  .querySelectorAll(".highlight")
  .forEach((highlightDiv) => createCopyButton(highlightDiv));
