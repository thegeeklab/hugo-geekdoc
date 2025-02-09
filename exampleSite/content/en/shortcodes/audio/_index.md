---
title: Audio
resources:
  - name: risen
    src: "risen.mp3"
    title: Risen
    params:
      credits: "[Sascha Ende on filmmusic.io](https://filmmusic.io/en/song/12856-risen)"
---

The audio shortcode allows you to embed audio files.

## Usage

Define your resources in the page front matter, custom parameter `params.credits` is optional.

<!-- spellchecker-disable -->

```md
---
resources:
  - name: risen
    src: "risen.mp3"
    title: Risen
    params:
      credits: "[Sascha Ende on filmmusic.io](https://filmmusic.io/en/song/12856-risen)"
---

{{</* audio name="risen" */>}}
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

{{< audio name="risen" >}}

<!-- spellchecker-enable -->
