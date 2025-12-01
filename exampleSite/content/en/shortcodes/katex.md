---
title: KaTeX
# cspell:ignore infty
---

[KaTeX](https://katex.org/) shortcode let you render math typesetting in markdown document.

## Usage

```latex
{{</* katex [display] [class="text-center"] */>}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{</* /katex */>}}
```

### Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-katex sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

## Example

<!-- cspell:disable -->
<!-- prettier-ignore -->
{{< katex display >}}
f(x) = \int_{-\infty}^\infty\hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi
{{< /katex >}}

<!-- cspell:enable -->

KaTeX can be used inline, for example {{< katex >}}\pi(x){{< /katex >}} or used with the `display` parameter as above.
