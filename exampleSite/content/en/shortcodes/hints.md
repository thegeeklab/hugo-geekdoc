---
title: Hints
---

Hint shortcode can be used as hint/alerts/notification block.

## Usage

<!-- prettier-ignore-start -->
```tpl
{{</* hint type=[note|tip|important|caution|warning] (icon=gdoc_github) (title=GitHub) */>}}
**Markdown content**\
Dolor sit, sumo unique argument um no. Gracie nominal id xiv. Romanesque acclimates investiture.
 Ornateness bland it ex enc, est yeti am bongo detract re.
{{</* /hint */>}}
```
<!-- prettier-ignore-end -->

### Attributes

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-hints sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

{{< hint type=note >}}
**Markdown content**\
Dolor sit, sumo unique `argument um no`. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.
{{< /hint >}}

{{< hint type=tip >}}
**Markdown content**\
Dolor sit, sumo unique `argument um no`. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.
{{< /hint >}}

{{< hint type=important >}}
**Markdown content**\
Dolor sit, sumo unique `argument um no`. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.
{{< /hint >}}

{{< hint type=caution >}}
**Markdown content**\
Dolor sit, sumo unique `argument um no`. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.
{{< /hint >}}

{{< hint type=warning >}}
**Markdown content**\
Dolor sit, sumo unique `argument um no`. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.

Romanesque acclimates investiture.
{{< /hint >}}

Example with a custom icon and title:

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< hint type=note icon=gdoc_github title=GitHub >}}
**Markdown content**\
Dolor sit, sumo unique argument um no. Gracie nominal id xiv. Romanesque acclimates investiture.
Ornateness bland it ex enc, est yeti am bongo detract re.
{{< /hint >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->
