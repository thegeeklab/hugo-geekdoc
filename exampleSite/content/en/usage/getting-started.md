---
title: Getting Started
weight: -20
---

This page tells you how to get started with the Geekdoc theme, including installation and basic configuration.

<!--more-->

{{< toc >}}

## Install requirements

You need a recent version of Hugo for local builds and previews of sites that use Geekdoc. As we are using [webpack](https://webpack.js.org/) as pre-processor, the normal version of Hugo is sufficient. If you prefer the extended version of Hugo anyway this will work as well. For comprehensive Hugo documentation, see [gohugo.io](https://gohugo.io/documentation/).

If you want to use the theme from a cloned branch instead of a release tarball you'll need to install `webpack` locally and run the build script once to create all required assets.

```shell
# install required packages from package.json
npm install

# run the build script to build required assets
npm run build

# build release tarball
npm run pack
```

## Using the theme

To prepare your new site environment just a few steps are required:

1. Create a new empty Hugo site.

   ```shell
   hugo new site demosite
   ```

2. Switch to the root of the new site.

   ```shell
   cd demosite
   ```

3. Install the Geekdoc theme from a [release bundle](#option-1-download-pre-build-release-bundle) (recommended) or from [Git branch](#option-2-clone-the-github-repository).

4. Create the minimal required Hugo configuration `config.toml`. For all configuration options take a look at the [configuration page](/usage/configuration/).

   ```toml
   baseURL = "http://localhost"
   title = "Geekdocs"
   theme = "hugo-geekdoc"

   pluralizeListTitles = false

   # Geekdoc required configuration
   pygmentsUseClasses = true
   pygmentsCodeFences = true
   disablePathToLower = true

   # Required if you want to render robots.txt template
   enableRobotsTXT = true

   # Needed for mermaid shortcodes
   [markup]
     [markup.goldmark.renderer]
       # Needed for mermaid shortcode or when nesting shortcodes (e.g. img within
       # columns or tabs)
       unsafe = true
     [markup.tableOfContents]
       startLevel = 1
       endLevel = 9

   [taxonomies]
      tag = "tags"
   ```

5. Test your site.

   ```shell
   hugo server -D
   ```

   The `-D` or `--buildDrafts` option is used to include content marked as draft during the build. It is used because content pages created with the `hugo new content` command have the `draft` flag set by default and this can lead to build errors in newly created projects. For projects with a production-ready content structure, this flag is not required in most cases and can be omitted.

### Option 1: Download pre-build release bundle

Download and extract the latest release bundle into the theme directory.

```shell
mkdir -p themes/hugo-geekdoc/
curl -L https://github.com/thegeeklab/hugo-geekdoc/releases/latest/download/hugo-geekdoc.tar.gz | tar -xz -C themes/hugo-geekdoc/ --strip-components=1
```

### Option 2: Clone the GitHub repository

{{< hint type=note >}}
Keep in mind this method is not recommended and needs some extra steps to get it working.
If you want to use the Theme as submodule keep in mind that your build process need to
run the described steps as well.
{{< /hint >}}

Clone the Geekdoc git repository.

```shell
git clone https://github.com/thegeeklab/hugo-geekdoc.git themes/hugo-geekdoc
```

Build required theme assets e.g. CSS files and SVG sprites.

```shell
npm install
npm run build
```

## Deployments

### Netlify

There are several ways to deploy your site with this theme on Netlify. Regardless of which solution you choose, the main goal is to ensure that the prebuilt theme release tarball is used or to run the [required commands](#option-2-clone-the-github-repository) to prepare the theme assets before running the Hugo build command.

Here are some possible solutions:

#### Use a Makefile

Add a Makefile to your repository to bundle the required steps.

{{< hint type=important >}}
The `Makefile` is only an example. Depending on your project structure, `BASEDIR` or `THEMEDIR` may need to be adapted.
{{< /hint >}}

```makefile
# Please change the theme version to the latest release version.
THEME_VERSION := v0.44.1
THEME := hugo-geekdoc
BASEDIR := docs
THEMEDIR := $(BASEDIR)/themes

.PHONY: doc
doc: doc-assets doc-build

.PHONY: doc-assets
doc-assets:
	mkdir -p $(THEMEDIR)/$(THEME)/ ; \
	curl -sSL "https://github.com/thegeeklab/$(THEME)/releases/download/${THEME_VERSION}/$(THEME).tar.gz" | tar -xz -C $(THEMEDIR)/$(THEME)/ --strip-components=1

.PHONY: doc-build
doc-build:
	cd $(BASEDIR); hugo

.PHONY: clean
clean:
	rm -rf $(THEMEDIR) && \
	rm -rf $(BASEDIR)/public
```

This Makefile can be used in your `netlify.toml`, take a look at the [Netlify example](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-netlify-toml-file) for more information:

```toml
[build]
publish = "docs/public"
command = "make doc"
```

#### Chain required commands

Chain all required commands to prepare the theme and build your site on the `command` option in your `netlify.toml` like this:

```toml
[build]
publish = "docs/public"
command = "command1 && command 2 && command3 && hugo"
```

### Subdirectories

{{< hint type=important >}}
As deploying Hugo sites on subdirectories is not as robust as on subdomains, we do not recommend this.
If you have a choice, using a domain/subdomain should always be the preferred solution!
{{< /hint >}}

If you want to deploy your site to a subdirectory of your domain, some extra steps are required:

- Configure your Hugo base URL e.g. `baseURL = http://localhost/demo/`.
- Don't use `relativeURLs: false` nor `canonifyURLs: true` as is can cause unwanted side effects!

There are two ways to get Markdown links or images working:

- Use the absolute path including your subdirectory e.g. `[testlink](/demo/example-site)`
- Overwrite the HTML base in your site configuration with `geekdocOverwriteHTMLBase = true` and use the relative path e.g. `[testlink](example-site)`

But there is another special case if you use `geekdocOverwriteHTMLBase = true`. If you use anchors in your Markdown links you have to ensure to always include the page path. As an example `[testlink](#some-anchor)` will resolve to `http://localhost/demo/#some-anchor` and not automatically include the current page!

## Known Limitations

### Minify HTML results in spacing issues

Using `hugo --minify` without further configuration or using other minify tools that also minify HTML files might result in spacing issues in the theme and is **not** supported.

After some testing we decided to not spend effort to fix this issue for now as the benefit is very low. There are some parts of the theme where spaces between HTML elements matters but were stripped by minify tools. Some of these issues are related to <!-- spellchecker-disable -->[gohugoio/hugo#6892](https://github.com/gohugoio/hugo/issues/6892).<!-- spellchecker-enable --> While recommendation like "don't depend on whitespace in your layout" sounds reasonable, it seems to be not that straight forward especially for something like embedded icons into the text flow.

If you still want to use Hugo's minify flag you should at least exclude HTML files in your site configuration as described in the [Hugo documentation](https://gohugo.io/getting-started/configuration/#configure-minify):

```toml
[minify]
  disableHTML = true
```
