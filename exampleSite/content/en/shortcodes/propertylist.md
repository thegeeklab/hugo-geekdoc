---
title: Properties
---

The property list shortcode creates a custom HTML description list that can be used to display properties or variables and general dependent information. The shortcode requires a data file in `data/properties/`, e.g. `data/properties/demo.yaml`.

## Usage

<!-- prettier-ignore-start -->
```tpl
{{</* propertylist name=demo (sort=name) (order=[asc|desc]) */>}}
```
<!-- prettier-ignore-end -->

The supported attributes can be taken from the following example:

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< include file="/data/properties/demo.yaml" language="Yaml" options="linenos=table" >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

### Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-buttons sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

## Example

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=demo sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->
