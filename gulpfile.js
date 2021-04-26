const gulp = require("gulp");
const iconfont = require("gulp-iconfont");
const filelist = require("gulp-filelist");

const realFavicon = require("gulp-real-favicon");
const path = require("path");
const fs = require("fs");

const svgSprite = require("gulp-svg-sprite");

var FAVICON_DATA_FILE = "build/faviconData.json";
var TIMESTAMP = Math.round(Date.now() / 1000);

gulp.task("favicon-generate", function (done) {
  realFavicon.generateFavicon(
    {
      masterPicture: "src/favicon/favicon-master.svg",
      dest: "static/favicon",
      iconsPath: "/favicon",
      design: {
        ios: {
          pictureAspect: "backgroundAndMargin",
          backgroundColor: "#2f333e",
          margin: "14%",
          assets: {
            ios6AndPriorIcons: false,
            ios7AndLaterIcons: false,
            precomposedIcons: false,
            declareOnlyDefaultIcon: true,
          },
        },
        desktopBrowser: {},
        windows: {
          pictureAspect: "whiteSilhouette",
          backgroundColor: "#2f333e",
          onConflict: "override",
          assets: {
            windows80Ie10Tile: false,
            windows10Ie11EdgeTiles: {
              small: false,
              medium: true,
              big: false,
              rectangle: false,
            },
          },
        },
        androidChrome: {
          pictureAspect: "shadow",
          themeColor: "#2f333e",
          manifest: {
            display: "standalone",
            orientation: "notSet",
            onConflict: "override",
            declared: true,
          },
          assets: {
            legacyIcon: false,
            lowResolutionIcons: false,
          },
        },
        safariPinnedTab: {
          pictureAspect: "silhouette",
          themeColor: "#2f333e",
        },
      },
      settings: {
        scalingAlgorithm: "Mitchell",
        errorOnImageTooSmall: false,
        readmeFile: false,
        htmlCodeFile: false,
        usePathAsIs: false,
      },
      markupFile: FAVICON_DATA_FILE,
    },
    function () {
      done();
    }
  );
});

gulp.task("favicon-check-update", function (done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function (err) {
    if (err) {
      throw err;
    }
  });
  done();
});

gulp.task("svg-sprite", function () {
  config = {
    shape: {
      id: {
        generator: "gdoc_%s",
      },
      dimension: {
        maxWidth: 28,
        maxHeight: 28,
        attributes: false,
      },
      spacing: {
        padding: 2,
        box: "content",
      },
      dest: "build/intermediate-svg",
    },
    svg: {
      xmlDeclaration: false,
      rootAttributes: {
        class: "svg-sprite",
      },
    },
    mode: {
      inline: true,
      symbol: {
        dest: "assets/sprites/",
        sprite: "geekdoc.svg",
        bust: false,
      },
    },
  };

  return gulp
    .src("src/icons/*.svg")
    .pipe(svgSprite(config))
    .pipe(gulp.dest("."));
});

gulp.task("svg-sprite-list", function () {
  config = { removeExtensions: true, flatten: true };

  return gulp
    .src("src/icons/*.svg")
    .pipe(filelist("exampleSite/data/sprites/geekdoc.json", config))
    .pipe(gulp.dest("."));
});

gulp.task("iconfont", function () {
  var lastUnicode = 0xea01;
  var files = fs.readdirSync("src/iconfont");

  // Filter files with containing unicode value
  // and set last unicode
  files.forEach(function (file) {
    var basename = path.basename(file);
    var matches = basename.match(/^(?:((?:u[0-9a-f]{4,6},?)+)\-)?(.+)\.svg$/i);
    var currentCode = -1;

    if (matches && matches[1]) {
      currentCode = parseInt(matches[1].split("u")[1], 16);
    }

    if (currentCode >= lastUnicode) {
      lastUnicode = ++currentCode;
    }
  });

  return gulp
    .src(["src/iconfont/*.svg"])
    .pipe(
      iconfont({
        startUnicode: lastUnicode,
        fontName: "GeekdocIcons",
        prependUnicode: true,
        normalize: true,
        fontHeight: 1001,
        centerHorizontally: true,
        formats: ["woff", "woff2"],
        timestamp: TIMESTAMP,
      })
    )
    .pipe(gulp.dest("static/fonts/"));
});

gulp.task("svg", gulp.series("svg-sprite", "svg-sprite-list"));

gulp.task(
  "default",
  gulp.series("svg-sprite", "iconfont", "favicon-generate")
);
