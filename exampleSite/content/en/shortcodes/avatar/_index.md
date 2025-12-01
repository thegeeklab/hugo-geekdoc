---
title: Avatar
resources:
  - name: avatar
    src: "avatar.jpg"
    title: "Avatar"
---

The avatar shortcode is another custom image shortcode.

<!--more-->

## Usage

Define a resource in the page front matter.

<!-- cspell:disable -->

```md
---
resources:
  - name: avatar
    src: "images/avatar.jpg"
    title: "Avatar"
---

{{</* avatar name="avatar" */>}}
```

<!-- cspell:enable -->

## Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-avatar sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

## Example

<!-- cspell:disable -->

{{< avatar name=avatar size="small" >}}

<!-- cspell:enable -->
