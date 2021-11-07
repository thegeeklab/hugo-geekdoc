---
title: Code Blocks
---

There are several ways to add code blocks. Most of them work out of the box, only the Hugo short code `<highlight>` needs to be configured to work properly. The theme also provides some additional features like a copy button and an option to set the maximum length of code blocks. Both of these functions and the dependent formatting rely on the `.highlight` CSS class. You must ensure that you always assign a language to your code blocks if you want to use these functions. If you do not want to apply syntax highlighting, you can also specify `plain` or `text` as the language.

{{< toc >}}

## Inline code

To display an inline shortcode use single quotes:

```plain
`some code`
```

**Example:** `some code`

## Code blocks

Code blocks can be uses without language specification:

````markdown
```Plain
some code
```
````

**Example:**

```Plain
some code
```

... or if you need language specific syntax highlighting:

````markdown
```Shell
# some code
echo "Hello world"
```
````

**Example:**

```Shell
# some code
echo "Hello World"
```

## Highlight shortcode

Hugo has a build-in shortcode for syntax highlighting. To work properly with this theme, you have to set following options in your site configuration:

{{< tabs "uniqueid" >}}
{{< tab "TOML" >}}

```TOML
pygmentsUseClasses=true
pygmentsCodeFences=true
```

{{< /tab >}}
{{< tab "YAML" >}}

```YAML
pygmentsUseClasses: true
pygmentsCodeFences: true
```

{{< /tab >}}
{{< /tabs >}}

You can use it like every other shortcode:

<!-- prettier-ignore -->
```markdown
{{</* highlight Shell "linenos=table" */>}}
# some code
echo "Hello World"
{{</* /highlight */>}}
```

**Example:**

<!-- markdownlint-disable -->

<!-- prettier-ignore-start -->
{{< highlight Shell "linenos=table" >}}
# some code
echo "Hello World"
{{< /highlight >}}
<!-- prettier-ignore-end-->

<!-- markdownlint-enable -->
