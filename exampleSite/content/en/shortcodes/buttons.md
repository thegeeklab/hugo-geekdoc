---
title: Buttons
---

Buttons are styled links that can lead to local page or external link.

<!-- prettier-ignore-start -->
```tpl
{{</* button relref="/" [class="...", size="large|regular"] */>}}Get Home{{</* /button */>}}
{{</* button href="https://github.com/thegeeklab/hugo-geekdoc" */>}}Contribute{{</* /button */>}}
```
<!-- prettier-ignore-end -->

## Example

<!-- prettier-ignore-start -->
<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
{{< button relref="/" >}}Get Home{{< /button >}}
{{< button href="https://github.com/thegeeklab/hugo-geekdoc" >}}Contribute{{< /button >}}
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
