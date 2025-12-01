---
title: Audio
resources:
  - name: diamonds-trap
    src: "diamonds-trap.mp3"
    title: Diamonds Trap
    params:
      credits: "[Jakob Eglmeier on openmusic.academy CC0-1.0](https://openmusic.academy/media-library/b9do2E2ZwVCfppyBf2yuej)"
# cspell:ignore Jakob Eglmeier openmusic
---

The audio shortcode allows you to embed audio files.

## Usage

Define your resources in the page front matter, custom parameter `params.credits` is optional.

<!-- cspell:disable -->

```md
---
resources:
  - name: diamonds-trap
    src: "diamonds-trap.mp3"
    title: Diamonds Trap
    params:
      credits: "[Jakob Eglmeier on openmusic.academy CC0-1.0](https://openmusic.academy/media-library/b9do2E2ZwVCfppyBf2yuej)"
---

{{</* audio name="diamonds-trap" */>}}
```

### Attributes

<!-- prettier-ignore-start -->
<!-- cspell:disable -->
{{< propertylist name=shortcode-audio sort=name order=asc >}}
<!-- cspell:enable -->
<!-- prettier-ignore-end -->

<!-- cspell:enable -->

## Example

<!-- cspell:disable -->

{{< audio name="diamonds-trap" >}}

<!-- cspell:enable -->
