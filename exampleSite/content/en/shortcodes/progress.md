---
title: Progress
---

A progress bar shows how far a process has progressed.

## Usage

<!-- prettier-ignore -->
```tpl
{{</* progress title=Eating value=65 icon=gdoc_heart */>}}
```

### Attributes

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-progress sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< progress title=Eating value=65 icon=gdoc_heart >}}
{{< progress title="Type: note" value=100 icon=gdoc_heart type=note >}}
{{< progress title="Type: tip" value=100 icon=gdoc_heart type=tip >}}
{{< progress title="Type: important" value=100 icon=gdoc_heart type=important >}}
{{< progress title="Type: caution" value=100 icon=gdoc_heart type=caution >}}
{{< progress title="Type: warning" value=100 icon=gdoc_heart type=warning >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->
