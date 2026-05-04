---
title: Video
resources:
  - name: ferris-wheel
    src: "ferris-wheel.mp4"
    title: Stunning view of a Ferris wheel glowing with vibrant lights against the night sky.
    params:
      credits: "[Siarhei Dalivelia on pexels](https://www.pexels.com/video/vibrant-ferris-wheel-at-night-with-colorful-lights-32072019/)"
# cspell:ignore Siarhei Dalivelia
---

The video shortcode allows you to embed video files.

## Usage

Define your resources in the page front matter, custom parameter `params.credits` is optional.

```md
---
resources:
  - name: ferris-wheel
    src: "ferris-wheel.mp4"
    title: Stunning view of a Ferris wheel glowing with vibrant lights against the night sky.
    params:
      credits: "[Siarhei Dalivelia on pexels](https://www.pexels.com/video/vibrant-ferris-wheel-at-night-with-colorful-lights-32072019/)"
---

{{</* video name="ferris-wheel" */>}}
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

{{< video name="ferris-wheel" type="video/MP4" preload="auto" controls="true" autoplay="true" loop="true" >}}

<!-- cspell:enable -->
