---
title: ToC-Tree
---

The `toc-tree` shortcode will generate a Table of Content from a section file tree of your content directory. The root of the resulting ToC will be the page on which you define the shortcode.

## Usage

<!-- prettier-ignore-start -->
```tpl
{{</* toc-tree [sortBy="title"] */>}}
```
<!-- prettier-ignore-end -->

### Attributes

<!-- prettier-ignore-start -->
<!-- spellchecker-disable -->
{{< propertylist name=shortcode-toc-tree sort=name order=asc >}}
<!-- spellchecker-enable -->
<!-- prettier-ignore-end -->

## Example

As said, the root will be the site on which the shortcode was used, you can see a demo including nesting in the [ToC Tree](/toc-tree/) section.
