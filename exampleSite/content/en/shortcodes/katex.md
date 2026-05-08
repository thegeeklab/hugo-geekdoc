---
title: KaTeX
geekdocMath: true
# cspell:ignore infty
---

The [KaTeX](https://katex.org/) integration lets you render math typesetting in markdown documents. The theme supports two ways to write math: the `katex` shortcode and `$$...$$` / `\(...\)` delimiters.

## Enabling KaTeX

To use raw `$$...$$` or `\(...\)` delimiters in your content, set `geekdocMath: true` either site-wide in the params config or per-page in the front matter. When enabled, the KaTeX assets are loaded in the page `<head>`. The `katex` shortcode does not require this flag, it lazy-loads the assets on first use, so it works on any page out of the box.

## Shortcode

Use the shortcode for inline or display math. The content between the opening and closing tags is rendered as a LaTeX expression. By default the expression is rendered inline (flowing with surrounding text using `\(...\)` delimiters). Pass the `display` flag to render it as display math instead (block-level, centered, on its own line using `\[...\]` delimiters).

```latex
{{</* katex display [class="text-center"] */>}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{</* /katex */>}}

KaTeX can be used inline, for example {{</* katex */>}}\pi(x){{</* /katex */>}}, or as display math with the `display` parameter as shown above.
```

### Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-katex sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

### Example

<!-- cspell:disable -->
<!-- prettier-ignore -->
{{< katex display >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

KaTeX can be used inline, for example {{< katex >}}\pi(x){{< /katex >}}, or as display math with the `display` parameter as shown above.
<!-- cspell:enable -->

## Delimiters

When math is enabled, expressions wrapped in `$$...$$` are auto-rendered as display math (block-level), and expressions wrapped in `\(...\)` are auto-rendered as inline math.

````markdown
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

KaTeX can be used inline, for example \(\pi(x)\), or as display math with `$$...$$` as shown above.
````

The theme intentionally uses `\(...\)` for inline math instead of the more common `$...$` to avoid collisions with literal dollar signs in prose (for example `it costs $5 to $10` would otherwise be interpreted as math). Content inside fenced code blocks and inline code spans is left untouched.

To prevent Goldmark from interpreting the LaTeX source as Markdown, configure the [passthrough extension][passthrough] in your Hugo config so the delimited content is forwarded to KaTeX untouched:

```yaml
markup:
  goldmark:
    extensions:
      passthrough:
        enable: true
        delimiters:
          block:
            - ["$$", "$$"]
            - ["\\[", "\\]"]
          inline:
            - ["\\(", "\\)"]
```

[passthrough]: https://gohugo.io/configuration/markup/#passthrough

### Example

<!-- cspell:disable -->
$$
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
$$

KaTeX can be used inline, for example \(\pi(x)\), or as display math with `$$...$$` as shown above.
<!-- cspell:enable -->
