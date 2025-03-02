import path from "path"
import { glob } from "glob"
import { fileURLToPath } from "url"

import { WebpackManifestPlugin } from "webpack-manifest-plugin"
import FaviconsWebpackPlugin from "favicons-webpack-plugin"
import RemoveEmptyScriptsPlugin from "webpack-remove-empty-scripts"
import CopyPlugin from "copy-webpack-plugin"
import { SRIPlugin, GitVersionPlugin } from "./webpack.plugins.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const nodeModulesPath = path.resolve(__dirname, "node_modules")

var config = {
  entry: {
    css: [
      path.resolve("src", "sass", "main.scss"),
      path.resolve("src", "sass", "mobile.scss"),
      path.resolve("src", "sass", "print.scss")
    ],
    main: path.resolve("src", "js", "index.js"),
    colortheme: path.resolve("src", "js", "colorTheme.js"),
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
  target: ["web", "es2017"],
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
        },
        {
          from: "img/*.svg",
          context: path.resolve(__dirname, "build")
        }
      ]
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve("src", "static", "favicon", "favicon.svg"),
      prefix: "favicon/",
      inject: false,
      favicons: {
        background: "#efefef",
        theme_color: "#efefef",
        icons: {
          android: { offset: 10 },
          appleIcon: { offset: 10 },
          appleStartup: { offset: 10 },
          favicons: true,
          windows: { offset: 10 },
          yandex: false
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

        files.forEach(function (element) {
          if (element.name.endsWith("VERSION")) return
          if (element.name.endsWith(".svg")) return
          if (element.name.startsWith("fonts/")) return
          if (element.name.startsWith("/favicon")) return

          Object.assign(manifest, {
            [element.name]: { src: element.path }
          })
        })

        return manifest
      }
    }),

    new SRIPlugin({
      sourceFile: "data/assets.json"
    }),

    new GitVersionPlugin({
      outputFile: "../VERSION"
    })
  ]
}

export default (argv) => {
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
              sourceMap: argv.mode === "development" ? true : false,
              sassOptions: {
                outputStyle: argv.mode === "development" ? "expanded" : "compressed"
              }
            }
          }
        ]
      }
    ]
  }

  return config
}
