import fs from "fs"
import crypto from "crypto"
import path from "path"
import { validate } from "schema-utils"

import { access as accessCps } from "fs"
import { execFile as execFileCps } from "child_process"
import { promisify } from "util"

class SRIPlugin {
  static defaultOptions = {
    algorithm: "sha512",
    sourceFile: "assets.json"
  }

  constructor(options = {}) {
    const schema = {
      type: "object",
      properties: {
        sourceFile: {
          type: "string"
        },
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
    compiler.hooks.done.tap("SRIPlugin", () => {
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

class GitVersionPlugin {
  static defaultOptions = {
    outputFile: "VERSION"
  }

  constructor(options = {}) {
    const schema = {
      type: "object",
      properties: {
        outputFile: {
          type: "string"
        }
      }
    }

    this.dependsOnGit = false
    this.options = { ...GitVersionPlugin.defaultOptions, ...options }

    validate(schema, options, {
      baseDataPath: "options",
      name: "GitVersion Plugin"
    })
  }

  apply(compiler) {
    const { webpack } = compiler
    const { Compilation } = webpack

    compiler.hooks.beforeCompile.tapPromise("GitVersionPlugin", async (compilation) => {
      const access = promisify(accessCps)

      try {
        await access(".git")
        this.dependsOnGit = true
      } catch (e) {
        this.dependsOnGit = false
      }
    })
    compiler.hooks.compilation.tap("GitVersionPlugin", (compilation) => {
      if (this.dependsOnGit) {
        const { context } = compilation.compiler
        compilation.fileDependencies.add(path.join(context, ".git/logs/HEAD")) // commit hash and branch changes
        compilation.contextDependencies.add(path.join(context, ".git/refs/tags")) // tag changes
      }

      compilation.hooks.processAssets.tapPromise(
        {
          name: "GitVersionPlugin",
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        async (assets) => {
          try {
            const v = await this.version()

            assets[this.options.outputFile] = {
              source: () => v + "\n",
              size: () => v.length + 1
            }
          } catch (e) {
            assets[this.options.outputFile] = {
              source: () => "",
              size: () => 0
            }
          }
        }
      )
    })
  }

  async version() {
    const execFile = promisify(execFileCps)

    try {
      const { stdout: describe } = await execFile("git", ["describe", "--long", "--tags"])
      const [, tag, offset] = describe
        .toString()
        .trim()
        .match(/^(.*)-(\d+)-g[0-9a-f]+$/)

      if (parseInt(offset) === 0) return tag
    } catch (e) {
      // no tags
    }

    const [{ stdout: branch }, { stdout: hash }] = await Promise.all([
      execFile("git", ["rev-parse", "--abbrev-ref", "HEAD"]),
      execFile("git", ["rev-parse", "HEAD"])
    ])

    return `${branch.toString().trim()}@${hash.toString().substring(0, 7)}`
  }
}

export { SRIPlugin, GitVersionPlugin }
