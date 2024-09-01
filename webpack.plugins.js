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
    this.options = { ...SRIPlugin.defaultOptions, ...options }

    validate(
      {
        type: "object",
        properties: {
          sourceFile: { type: "string" },
          outputFile: { type: "string" },
          algorithm: { type: "string" }
        }
      },
      options,
      {
        name: "SRI Plugin",
        baseDataPath: "options"
      }
    )
  }

  apply(compiler) {
    compiler.hooks.done.tap("SRIPlugin", () => {
      const data = JSON.parse(fs.readFileSync(this.options.sourceFile, "utf8"))
      const outputFile = this.options.outputFile || this.options.sourceFile
      const { algorithm } = this.options

      const calculateSRI = (file) => {
        const fileContent = fs.readFileSync(path.join(".", "static", file))
        const hash = crypto.createHash(algorithm).update(fileContent).digest("base64")
        return `${algorithm}-${hash}`
      }

      Object.keys(data).forEach((key) => {
        data[key].integrity = calculateSRI(data[key].src)
      })

      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), { encoding: "utf8", flag: "w" })
    })
  }
}

class GitVersionPlugin {
  static defaultOptions = {
    outputFile: "VERSION"
  }

  constructor(options = {}) {
    this.options = { ...GitVersionPlugin.defaultOptions, ...options }

    validate(
      {
        type: "object",
        properties: {
          outputFile: { type: "string" }
        }
      },
      options,
      {
        baseDataPath: "options",
        name: "GitVersion Plugin"
      }
    )
  }

  apply(compiler) {
    const { webpack, hooks, context } = compiler
    const { Compilation } = webpack

    hooks.beforeCompile.tapPromise("GitVersionPlugin", async () => {
      const access = promisify(accessCps)

      try {
        await access(".git")
        this.dependsOnGit = true
      } catch {
        this.dependsOnGit = false
      }
    })

    hooks.compilation.tap("GitVersionPlugin", (compilation) => {
      if (this.dependsOnGit) {
        compilation.fileDependencies.add(path.join(context, ".git/logs/HEAD"))
        compilation.contextDependencies.add(path.join(context, ".git/refs/tags"))
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
              source: () => `${v}\n`,
              size: () => v.length + 1
            }
          } catch {
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
      const [, tag, offset] = describe.trim().match(/^(.*)-(\d+)-g[0-9a-f]+$/)
      return parseInt(offset) === 0 ? tag : this.getBranchAndHash()
    } catch {
      return this.getBranchAndHash()
    }
  }

  async getBranchAndHash() {
    const execFile = promisify(execFileCps)
    const [{ stdout: branch }, { stdout: hash }] = await Promise.all([
      execFile("git", ["rev-parse", "--abbrev-ref", "HEAD"]),
      execFile("git", ["rev-parse", "HEAD"])
    ])
    return `${branch.trim()}@${hash.substring(0, 7)}`
  }
}

export { SRIPlugin, GitVersionPlugin }
