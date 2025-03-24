---
title: Customization
---

{{< toc >}}

## Custom resources

To add custom resources to your site e.g. CSS or JavaScript files, create the `layouts/partials/head/custom.html` in the root directory of your project. Add the source files you want to include in the `static/` folder of your project, for example `static/css/custom.css` and `static/js/custom.js`. To include the files in your site, add the following code to `layouts/partials/head/custom.html`:

```html
<link rel="stylesheet" type="text/css" href="/css/custom.css" />
<script type="text/javascript" src="/js/custom.js"></script>
```

Ensure to use the absolute path to the files.
