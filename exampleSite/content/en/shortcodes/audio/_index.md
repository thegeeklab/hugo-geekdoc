---
title: Audio
resources:
  - name: diamonds-trap
    src: "diamonds-trap.mp3"
    title: Diamonds Trap
    params:
      credits: "[Jakob Eglmeier on openmusic.academy CC0-1.0](https://openmusic.academy/media-library/b9do2E2ZwVCfppyBf2yuej)"
---

The audio shortcode allows you to embed audio files.

## Usage

Define your resources in the page front matter, custom parameter `params.credits` is optional.

<!-- spellchecker-disable -->

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
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-audio sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

<!-- spellchecker-enable -->

## Example

<!-- spellchecker-disable -->

{{< audio name="diamonds-trap" >}}

<!-- spellchecker-enable -->
