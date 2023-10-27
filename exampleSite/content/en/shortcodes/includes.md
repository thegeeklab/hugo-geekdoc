---
title: Includes
---

Include shortcode can include files of different types. By specifying a language, the included file will have syntax highlighting.

## Usage

<!-- prettier-ignore-start -->
```tpl
{{</* include file="relative/path/from/hugo/root" language="go" */>}}
```
<!-- prettier-ignore-end -->

### Attributes

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-includes sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

### Example 1: Markdown file (default)

If no other options are specified, files will be rendered as Markdown using the `RenderString` [function](https://gohugo.io/functions/renderstring/).

{{< hint type=important >}}
**Location of markdown files**\
If you include markdown files that should not get a menu entry, place them outside the content folder or exclude them otherwise.
{{< /hint >}}

<!-- prettier-ignore -->
```tpl
{{</* include file="/static/_includes/example.md.part" */>}}
```

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< include file="/static/_includes/example.md.part" >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

### Example 2: Language files

This method can be used to include source code files and keep them automatically up to date.

<!-- prettier-ignore -->
```tpl
{{</* include file="config/_default/config.yaml" language="yaml" options="linenos=table,hl_lines=5-6,linenostart=100" */>}}
```

Result:

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< include file="config/_default/config.yaml" language="yaml" options="linenos=table,hl_lines=5-6,linenostart=100" >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

### Example 3: HTML

HTML content will be filtered by the `safeHTML` filter and added to the rendered page output.

<!-- prettier-ignore -->
```tpl
{{</* include file="/static/_includes/example.html.part" type="html" */>}}
```

{{< include file="/static/_includes/example.html.part" type="html" >}}

### Example 4: Hugo Pages

In some situations, it can be helpful to include Markdown files that also contain shortcodes. While the [default method](#example-1-markdown-file-default) works fine to render plain Markdown, shortcodes are not parsed. The only way to get this to work is to use Hugo pages. There are several ways to structure these include pages, so whatever you do, keep in mind that Hugo needs to be able to render and serve these files as regular pages! How it works:

1. First you need to create a directory **within** your content directory. For this example site `_includes` is used.
2. To prevent the theme from embedding the page in the navigation, create a file `_includes/_index.md` and add `geekdocHidden: true` to the front matter.
3. Place your Markdown files within the `_includes` folder e.g. `/_includes/include-page.md`. Make sure to name it `*.md`.
4. Include the page using `{{</* include file="/_includes/include-page.md" type="page" */>}}`.

Resulting structure should look like this:

```shell
_includes/
 ├── include-page.md
 └── _index.md
```

{{< include file="/_includes/include-page.md" type="page" >}}
