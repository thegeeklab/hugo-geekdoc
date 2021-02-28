---
title: Icons
---

<!-- spellchecker-disable -->

{{< toc >}}

<!-- spellchecker-enable -->

## Custom icons

The only supported source for custom icons are SVG sprites. Some icon frameworks provides ready to use sprites e.g. FontAwesome. If the framework don't provide sprites, you can create your own from raw SVG icons. There are a lot of tools available to create sprites, please choose one that fits your need. One solution could be [svgsprit.es](https://svgsprit.es/).

Regardless of which tool (or existing sprite) you choose, there are a few requirements that must be met:

1. The sprite must be a valid **SVG** file.
2. You have to ensure to **hide the sprite** from the DOM: Apply the predefined class `svg-sprite` or `hidden` to the root element of your sprite or add a small piece of inline CSS e.g. `style="display: none;"`.
3. Save the sprite to the folder `assets/sprites` right beside your `content` folder.

**Example:**

FontAwesome provides three pre-build sprites included in the regular Web download pack, `sprites/brands.svg`, `sprites/regular.svg` and `sprites/solid.svg`. Choose your sprite to use and copy it to your projects root directory into `assets/sprites`, right beside your `content` folder. The result should look like this:

```Bash
my_projcet/
├── assets
│   └── sprites
│       └── regular.svg
├── config.yaml
├── content
│   ├── _index.md
│   ├── ...
```

That's it! The theme will auto-load all available SVG sprites provided in the assets folder. To use the icons e.g. in the [bundle menu](/usage/menus/#bundle-menu), you need to lookup the id of the icon. An example would be `thumbs-up` {{< sprite-icon "thumbs-up" >}}. There is also a simple shortcode available to include sprite icons outside of menus `{{</* sprite-icon "thumbs-up" */>}}`.

| Result                            | Usage                                   |
| --------------------------------- | --------------------------------------- |
| {{< sprite-icon "thumbs-up" >}}   | `{{</* sprite-icon "thumbs-up" */>}}`   |
| {{< sprite-icon "thumbs-down" >}} | `{{</* sprite-icon "thumbs-down" */>}}` |
| {{< sprite-icon "laugh" >}}       | `{{</* sprite-icon "laugh" */>}}`       |
| {{< sprite-icon "lemon" >}}       | `{{</* sprite-icon "lemon" */>}}`       |
| {{< sprite-icon "moon" >}}        | `{{</* sprite-icon "moon" */>}}`        |

## Build-in icons

The theme bundles just a small set of hand crafted icons.

{{< sprites >}}
