const fs = require("fs")
const crypto = require("crypto")
const path = require("path")
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

module.exports = SRIPlugin
