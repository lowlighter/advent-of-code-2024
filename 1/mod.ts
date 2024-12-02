import { fromFileUrl } from "jsr:@std/path@1"
import { parseArgs } from "jsr:@std/cli/parse-args"

const { _: [file = "input"] } = parseArgs(Deno.args)
const input = Deno.readTextFileSync(fromFileUrl(import.meta.resolve(`./${file}`)))
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number))

const a = input.map((n) => n[0]).sort()
const b = input.map((n) => n[1]).sort()

console.log(a.reduce((d, _, i) => d + Math.abs(a[i] - b[i]), 0))

const c = {} as Record<number, number>
b.forEach((v) => (c[v] ??= 0, c[v]++))

console.log(a.reduce((d, _, i) => d + a[i] * (c[a[i]] ?? 0), 0))
