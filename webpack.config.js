const path = require("path")
const fs = require("fs")
const crypto = require("crypto")

const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const FaviconsWebpackPlugin = require("favicons-webpack-plugin")
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts")
const CopyPlugin = require("copy-webpack-plugin")
const { validate } = require("schema-utils")

class SRIPlugin {
  static defaultOptions = {
    algorithm: "sha512",
    sourceFile: "assets.json"
  }

  constructor(options = {}) {
    const schema = {
      type: "object",
      properties: {
        outputFile: {
          type: "string"
        },
        algorithm: {
          type: "string"
        }
      }
    }

    this.options = { ...SRIPlugin.defaultOptions, ...options }

    validate(schema, options, {
      name: "SRI Plugin",
      baseDataPath: "options"
    })
  }

  apply(compiler) {
    compiler.hooks.done.tap("SRIPlugin", (manifest) => {
      let data = JSON.parse(fs.readFileSync(this.options.sourceFile, "utf8"))
      let outputFile = this.options.outputFile ? this.options.outputFile : this.options.sourceFile

      const checksum = (str, algorithm = this.options.algorithm, encoding = "base64") =>
        crypto.createHash(algorithm).update(str, "utf8").digest(encoding)
      const fileSum = (file, algorithm) => checksum(fs.readFileSync(file), algorithm)
      const calculateSRI = (file, algorithm = this.options.algorithm) =>
        `${algorithm}-${fileSum(path.join(".", "static", file), algorithm)}`

      Object.keys(data).forEach((key) => {
        let element = data[key]
        element.integrity = calculateSRI(element.src)
      })

      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), {
        encoding: "utf8",
        flag: "w"
      })
    })
  }
}

var config = {
  entry: {
    css: [
      path.resolve("src", "sass", "main.scss"),
      path.resolve("src", "sass", "mobile.scss"),
      path.resolve("src", "sass", "print.scss")
    ],
    bundle: path.resolve("src", "js", "app.js"),
    mermaid: path.resolve("src", "js", "mermaid.js")
  },
  output: {
    filename: "js/[name].bundle.min.js",
    chunkFilename: "js/[name].chunk.min.js",
    path: path.join(__dirname, "static"),
    publicPath: "/",
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
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
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
                outputStyle: "compressed"
              }
            }
          }
        ]
      }
    ]
  }

  return config
}
