---
title: Video
resources:
  - name: lorem-ipsum-crossfade
    src: "lorem-ipsum-crossfade.mp4"
    title: Lorem Ipsum crossfade
    params:
      credits: "Created with Claude on an iPad. The license is public domain."
---

The video shortcode allows you to embed video files.

## Usage

Define your resources in the page front matter, custom parameter `params.credits` is optional.

```md
---
resources:
  - name: lorem-ipsum-crossfade
    src: "lorem-ipsum-crossfade.mp3"
    title: Lorem Ipsum crossfade
    params:
      credits: "Created with Claude on an iPad. This is public domain."
---

{{</* video name="lorem-ipsum-crossfade" */>}}
```

### Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-video sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

<!-- cspell:enable -->

## Example

<!-- cspell:disable -->

{{< video name="lorem-ipsum-crossfade" type="video/MP4" preload="auto" controls="true" autoplay="true" loop="true" >}}

<!-- cspell:enable -->
