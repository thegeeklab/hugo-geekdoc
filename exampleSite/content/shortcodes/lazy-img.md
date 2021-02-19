If you don't want to load images outside of user viewport at once, you can use `lazy-img` to load these only when needed.

```html
{{</* lazy-img src="/example.png" alt="Example" */>}}
```

`lazy-img` also support link behaviour via `href` attribute
```html
{{</* lazy-img src="/example.png" alt="Example" href="example.com" */>}}
```

Attributes:

<!-- prettier-ignore -->
| Name | Usage | default |
|---|---|---|
| src | Link to image | empty value |
| alt | Description for displayed image | empty value |
| href | Link that will open after click on the image | empty value |