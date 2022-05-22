---
title: Properties
---

The property list shortcode creates a custom HTML description list that can be used to display properties or variables and general dependent information. The shortcode requires a data file in `data/properties/`, e.g. `data/properties/demo.yaml`, where the filename must be passed to the `name` attribute of the property list shortcode.

<!-- prettier-ignore-start -->
```tpl
{{</* propertylist name=demo */>}}
```
<!-- prettier-ignore-end -->

The supported attributes can be taken from the following example:

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< include file="/data/properties/demo.yaml" language="Yaml" options="linenos=table" >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

{{< propertylist name=demo >}}
