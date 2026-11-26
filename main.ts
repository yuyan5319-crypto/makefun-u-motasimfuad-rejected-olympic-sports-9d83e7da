// Synchronised Queueing — the Olympic sport of standing still.
//
// Writes one funny single-line rejected Olympic sport to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt) and prints
// it to stdout. Refuses to run if the line breaks the gate rules:
// 1-200 characters, a single line, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Synchronised queueing: four athletes hold a perfect line for four hours, and gold goes to whoever sighs the least.";

const MAX_CHARS = 200;

function validate(line: string): void {
  // Count characters as code points, matching how a judge reads the text.
  const chars = [...line].length;
  if (chars === 0) {
    throw new Error("entry line must not be empty");
  }
  if (chars > MAX_CHARS) {
    throw new Error(
      `entry line is ${chars} characters, over the ${MAX_CHARS} limit`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry line must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("entry line must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  // No control characters other than the ones already excluded above.
  for (const ch of line) {
    if (ch.codePointAt(0)! < 0x20 || ch.codePointAt(0) === 0x7f) {
      throw new Error("entry line must not contain control characters");
    }
  }
}

validate(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
