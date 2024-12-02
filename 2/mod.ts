import { fromFileUrl } from "jsr:@std/path@1"
import { parseArgs } from "jsr:@std/cli/parse-args"

const { 2: p2, _: [file = "input"] } = parseArgs(Deno.args, { boolean: ["2"] })
const input = Deno.readTextFileSync(fromFileUrl(import.meta.resolve(`./${file}`)))
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number))

let n = 0
for (const _level of input) {
  for (let p = -1; p < _level.length; p++) {
    const level = _level.slice()
    if ((p >= 0) && (!p2)) {
      break
    }
    if (p >= 0) {
      level.splice(p, 1)
    }
    let ok = true
    const sign = Math.sign(level[1] - level[0])
    for (let i = 0; i < level.length - 1; i++) {
      if ((Math.abs(level[i] - level[i + 1]) < 1) || (Math.abs(level[i] - level[i + 1]) > 3)) {
        ok = false
        break
      }
      if (Math.sign(level[i + 1] - level[i]) !== sign) {
        ok = false
        break
      }
    }
    if (ok) {
      n++
      break
    }
  }
}
console.log(n)
