---
title: Getting Started
weight: -20
---

This page tells you how to get started with the Geekdoc theme, including installation and basic configuration.

<!-- spellchecker-disable -->

{{< toc >}}

<!-- spellchecker-enable -->

## Install requirements

You need a recent version of Hugo for local builds and previews of sites that use Geekdoc. As we are using [gulp](https://gulpjs.com/) as pre-processor the normal version of Hugo is sufficient. If you prefer the extended version of Hugo anyway this will work as well. For comprehensive Hugo documentation, see [gohugo.io](https://gohugo.io/documentation/).

If you want to use the theme from a cloned branch instead of a release tarball you'll need to install `gulp` locally and run the default pipeline once to create all required assets.

```Shell
# install required packages from package.json
npm install

# run gulp pipeline to build required assets
gulp default
```

## Using the theme

To prepare your new site environment just a few steps are required:

1. Create a new empty Hugo site.

   ```Shell
   hugo new site demosite
   ```

2. Switch to the root of the new site.

   ```Shell
   cd demosite
   ```

3. Install the Geekdoc theme from a [release bundle](#option-1-download-pre-build-release-bundle) (recommended) or from [Git branch](#option-2-clone-the-github-repository).

4. Create the minimal required Hugo configuration `config.toml`. For all configuration options see [here](/usage/configuration/).

   ```Toml
   baseURL = "http://localhost"
   title = "Geekdocs"
   theme = "hugo-geekdoc"

   # Geekdoc required configuration
   pygmentsUseClasses = true
   pygmentsCodeFences = true
   disablePathToLower = true

   # Needed for mermaid shortcodes
   [markup]
     [markup.goldmark.renderer]
       # Needed for mermaid shortcode
       unsafe = true
     [markup.tableOfContents]
       startLevel = 1
       endLevel = 9
   ```

5. Test your site.

   ```Shell
   hugo server -D
   ```

### Option 1: Download pre-build release bundle

Download and extract the latest release bundle into the theme directory.

```Shell
mkdir -p themes/hugo-geekdoc/
curl -L https://github.com/thegeeklab/hugo-geekdoc/releases/latest/download/hugo-geekdoc.tar.gz | tar -xz -C themes/hugo-geekdoc/ --strip-components=1
```

### Option 2: Clone the GitHub repository

{{< hint info >}}
**Info**\
Keep in mind this method is not recommended and needs some extra steps to get it working.
If you want to use the Theme as submodule keep in mind that your build process need to
run the described steps as well.
{{< /hint >}}

Clone the Geekdoc git repository.

```Shell
git clone https://github.com/thegeeklab/hugo-geekdoc.git themes/geekdoc
```

Build required theme assets e.g. CSS files and SVG sprites with `gulp`.

```Shell
gulp default
```
