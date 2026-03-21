const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
const ALPHABET_MAP: Record<string, number> = {}
for (let i = 0; i < ALPHABET.length; i++) {
  ALPHABET_MAP[ALPHABET[i]] = i
}

export function encodeBase58(bytes: Uint8Array): string {
  if (bytes.length === 0) return ""

  let zeros = 0
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++

  const encoded: number[] = []
  const input = bytes.slice()

  let startAt = zeros
  while (startAt < input.length) {
    let carry = 0
    for (let i = startAt; i < input.length; i++) {
      const x = (input[i] & 0xff) + carry * 256
      input[i] = (x / 58) | 0
      carry = x % 58
    }
    encoded.push(carry)
    while (startAt < input.length && input[startAt] === 0) startAt++
  }

  let result = ""
  for (let i = 0; i < zeros; i++) result += "1"
  for (let i = encoded.length - 1; i >= 0; i--) {
    result += ALPHABET[encoded[i]]
  }
  return result
}

export function decodeBase58(str: string): Uint8Array {
  if (str.length === 0) return new Uint8Array(0)

  if (!/^[1-9A-HJ-NP-Za-km-z]+$/.test(str)) {
    throw new Error("Invalid Base58 string")
  }

  let zeros = 0
  while (zeros < str.length && str[zeros] === "1") zeros++

  const decoded: number[] = []
  const input = str.split("").map(c => {
    const v = ALPHABET_MAP[c]
    if (v === undefined) throw new Error("Invalid Base58 character")
    return v
  })

  let startAt = zeros
  while (startAt < input.length) {
    let carry = 0
    for (let i = startAt; i < input.length; i++) {
      const x = input[i] + carry * 58
      input[i] = (x / 256) | 0
      carry = x % 256
    }
    decoded.push(carry)
    while (startAt < input.length && input[startAt] === 0) startAt++
  }

  const out = new Uint8Array(zeros + decoded.length)
  out.fill(0, 0, zeros)
  for (let i = 0; i < decoded.length; i++) {
    out[zeros + i] = decoded[decoded.length - 1 - i]
  }
  return out
}
