There are multiple ways to add code blocks. Most of them works out of the box only the hugo shortcode `<highlight>` need some configuration to work properly.

## Inline code
To display an inline shortcode use single quotes:
```
`some code`
```

**Example:** `some code`

## Code blocks
Codeblocks can be uses without language specification:

````
```
some code
```
````

**Example:**

```
some code
```

... or if you need language specific syntax highlighting:

````
```Shell
# some code
echo "Hello world"
```
````

**Example:**

```Shell
# some code
echo "Hello World"
```

## Highlight shortcode

Hugo has a build-in shortcode for syntax highlighting. To work properly with this theme, you have to set following options in your sites config:

{{< tabs "uniqueid" >}}
{{< tab "TOML" >}}
```TOML
pygmentsUseClasses=true
pygmentsCodeFences=true
```
{{< /tab >}}
{{< tab "YAML" >}}
```YAML
pygmentsUseClasses: true
pygmentsCodeFences: true
```
{{< /tab >}}
{{< /tabs >}}

You can use it like every other shortcode:

```Markdown
{{</* highlight Shell "linenos=table" */>}}
# some code
echo "Hello World"
{{</* /highlight */>}}
```

**Example:**

{{< highlight Shell "linenos=table" >}}
# some code
echo "Hello World"
{{< /highlight >}}
