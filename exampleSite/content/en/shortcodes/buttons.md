---
title: Buttons
---

Buttons are styled links that can lead to local page or external link.

## Usage

<!-- prettier-ignore -->
```tpl
{{</* button relref="/" [class="...", size="large|regular"] */>}}Get Home{{</* /button */>}}
{{</* button href="https://github.com/thegeeklab/hugo-geekdoc" */>}}Contribute{{</* /button */>}}
```

### Attributes

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-buttons sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

<!-- prettier-ignore-start -->
<!-- markdownlint-capture -->
<!-- markdownlint-disable -->
{{< button relref="/" >}}Get Home{{< /button >}}
{{< button href="https://github.com/thegeeklab/hugo-geekdoc" >}}Contribute{{< /button >}}
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
