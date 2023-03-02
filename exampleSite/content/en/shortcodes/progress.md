---
title: Progress
---

Progress bar to vizualize a state.

## Attributes

| Name             | Description                                                                      | default   |
| ---------------- | -------------------------------------------------------------------------------- | --------- |
| value            | progress value                                                                   | 0         |
| icon (optional)  | icon to use, need to be an icon from an [SVG sprite](/posts/features/icon-sets/) | undefined |
| title (optional) | progress title                                                                   | undefined |

## Usage

<!-- prettier-ignore-start -->
```tpl
{{</* progress title=Eating value=65 icon=gdoc_heart */>}}
```
<!-- prettier-ignore-end -->

## Example

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< progress title=Eating value=65 icon=gdoc_heart >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->
