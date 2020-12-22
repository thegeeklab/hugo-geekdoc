If you want to customize the color scheme of the theme to give it your individual touch you are just a few lines CSS away. In general, you have to override the defaults, the easiest way to do so is to create a `static/custom.css` file right in your site root.

All necessary class names are listed below. If you miss some classes required for a color scheme you are very welcome to create an [Issue](https://github.com/thegeeklab/hugo-geekdoc/issues) or Pull Request. For some inspiration you can have a look at [https://www.color-hex.com/color-palettes/](https://www.color-hex.com/). The following listing use the _HC-primary_ color palette as an example:

<!-- markdownlint-disable -->
<!-- spellchecker-disable -->

<!-- prettier-ignore-start -->
{{< highlight CSS "linenos=table" >}}
/* default link color */
a { color: #1c388e; }
a:visited { color: #73bfb8 }

/* site header */
.gdoc-header { background: #e66a4e; border-color: #404040; }
.gdoc-header__link, .gdoc-header__link:visited { color: #ffffff; }

/* page links */
.gdoc-page__footer a, .gdoc-page__footer a:visited { color: #1c388e; }
.gdoc-page__header a, .gdoc-page__header a:visited { color: #1c388e; }

/* site footer */
.gdoc-footer { background: #404040; color: #ffffff; }
.gdoc-footer__link{ color: #fecf50; }
.gdoc-footer__link:visited, .gdoc-footer__link:hover { color: #fecf50; }

/* custom shortcodes */
/* button */
.gdoc-button { color: #495057; }
.gdoc-button:hover { background-color: #eb8771; border-color: #e66a4e; color: #ffffff; }

/* hint */
.gdoc-hint.info { background: #d1d7e8; border-color: #324b99; color: black; }
.gdoc-hint.warning { background: #fef5dc; border-color: #e4ba48; color: black; }
.gdoc-hint.danger { background: #fae1db; border-color: #cf5f46; color: black; }
{{< /highlight >}}
<!-- prettier-ignore-end -->

<!-- spellchecker-enable -->
<!-- markdownlint-enable -->

And that is how the result will looks like. Happy customizing!

[![HC-primary Color Scheme](/media/colorscheme-example.png)](/media/colorscheme-example.png)
