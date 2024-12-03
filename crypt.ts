import { decrypt, encrypt, exportKey } from "jsr:@libs/crypto@2"
import { parseArgs } from "jsr:@std/cli/parse-args"
import { fromFileUrl } from "jsr:@std/path@1"
import { exists } from "jsr:@std/fs@1"

const { encrypt: _encrypt, decrypt: _decrypt, password, _: [file] } = parseArgs(Deno.args, { string: ["password"], boolean: ["encrypt", "decrypt"], alias: { p: "password", e: "encrypt", d: "decrypt" } })
const path = fromFileUrl(import.meta.resolve(`./${file}`))
if (!await exists(path)) {
  throw new Error(`File not found: ${path}`)
}
if (!password) {
  throw new Error("Password is required")
}
if ((_encrypt && _decrypt) || (!_encrypt && !_decrypt)) {
  throw new Error("Either --encrypt or --decrypt must be specified")
}

const key = await exportKey({ seed: `${password}`, salt: "aoc2024" })
const banner = "This file has been encrypted to ensure a fair competition :)\n"

if (_encrypt) {
  const encrypted = await encrypt(await Deno.readTextFile(path), { key, length: 0 })
  await Deno.writeTextFile(path, `${banner}${encrypted}`)
}

if (_decrypt) {
  const decrypted = await decrypt(Deno.readTextFileSync(path).replace(banner, ""), { key })
  await Deno.writeTextFile(path, decrypted)
}
