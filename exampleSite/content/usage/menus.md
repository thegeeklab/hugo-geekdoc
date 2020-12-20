The theme supports two different kinds of menus. [File-tree menu](#file-tree-menu) is the default one and does not require further configuration to work. If you want full control about your menu the [bundle menu](#bundle-menu) is a powerful option to accomplish it.

## File-tree menu

As the name already suggests, the file tree menu builds a menu from the file system structure of the content folder. By default, areas and subareas are sorted alphabetically by the title of the pages. To manipulate the order the `weight` parameter in a page [front matter](https://gohugo.io/content-management/front-matter/) can be used. To structure your content folder you have to use [page bundles](https://gohugo.io/content-management/organization/#page-bundles), single files are **not** supported. Hugo will render build single files in the content folder just fine but it will not be added to the menu.

**Example:**

A file structure like shown below...

```plain
content/
├── level-1
│   ├── _index.md
│   ├── level-1-1.md
│   ├── level-1-2.md
│   └── level-1-3
│       ├── _index.md
│       └── level-1-3-1.md
└── level-2
    ├── _index.md
    ├── level-2-1.md
    └── level-2-2.md
```

... results in a menu that looks like this.

[![Example file-tree menu](/media/file-tree.png)](/media/file-tree.png)

## Bundle menu
