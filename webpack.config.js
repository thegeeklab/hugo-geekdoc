const path = require("path")
const glob = require("glob")

const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const CopyPlugin = require("copy-webpack-plugin")
const SRIPlugin = require("./webpack.plugins")

const nodeModulesPath = path.resolve(__dirname, "node_modules")

var config = {
  entry: {
    css: [
      path.resolve("src", "sass", "main.scss"),
      path.resolve("src", "sass", "mobile.scss"),
      path.resolve("src", "sass", "print.scss")
    ],
    main: path.resolve("src", "js", "app.js"),
    mermaid: path.resolve("src", "js", "mermaid.js"),
    katex: [path.resolve("src", "js", "katex.js")].concat(
      glob.sync(path.join(nodeModulesPath, "katex", "dist", "fonts", "*.{woff,woff2}"))
    ),
    search: [path.resolve("src", "js", "search.js")]
  },
  output: {
    filename: "js/[name]-[contenthash:8].bundle.min.js",
    chunkFilename: "js/[name]-[contenthash:8].chunk.min.js",
    path: path.join(__dirname, "static"),
    clean: true
  },
  watchOptions: {
    ignored: ["/exampleSite/", "/node_modules/"]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "**/*",
          context: path.resolve(__dirname, "src", "static")
        },
        {
          from: "fonts/*.{woff,woff2}",
          context: path.resolve(__dirname, "build")
        },
        {
          from: "sprites/*.svg",
          to: path.resolve(__dirname, "assets"),
          context: path.resolve(__dirname, "build")
        }
      ]
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve("src", "static", "favicon", "favicon.svg"),
      cache: true,
      prefix: "favicon/",
      inject: false,
      favicons: {
        background: "#2f333e",
        theme_color: "#2f333e",
        icons: {
          android: { offset: 10 },
          appleIcon: { offset: 10 },
          appleStartup: { offset: 10 },
          favicons: true,
          windows: { offset: 10 },
          yandex: false,
          coast: false
        }
      }
    }),

    new RemoveEmptyScriptsPlugin(),

    new WebpackManifestPlugin({
      fileName: "../data/assets.json",
      publicPath: "",
      writeToFileEmit: true,
      generate(seed, files) {
        let manifest = {}

        files.forEach(function (element, index) {
          if (element.name.endsWith(".svg")) return

          Object.assign(manifest, {
            [element.name]: { src: element.path }
          })
        })

        return manifest
      }
    }),

    new SRIPlugin({
      sourceFile: "data/assets.json"
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "eval-cheap-source-map"
  }

  config.module = {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        type: "asset/resource",
        generator: {
          filename: "[name]-[contenthash:8].min.css"
        },
        use: [
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"]
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // FIXME: https://github.com/webpack-contrib/sass-loader/issues/962#issuecomment-1002675051
                sourceMap: argv.mode === "development" ? true : false,
                sourceMapEmbed: argv.mode === "development" ? true : false,
                outputStyle: "compressed",
                includePaths: [nodeModulesPath]
              }
            }
          }
        ]
      }
    ]
  }

  return config
}
