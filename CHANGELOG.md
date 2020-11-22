- ENHANCEMENT
  - load static css/js assets from data template:
    Build-in assets are now hashed by default. The static assets are located
    in the `assets` directory. The theme will read and use the hashed files
    from `data/assets.json`. Exception: `custom.css` will be used unhashed.
