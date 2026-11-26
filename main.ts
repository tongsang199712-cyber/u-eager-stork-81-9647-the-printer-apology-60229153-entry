// Entry for the make.fun bounty "The Printer Apology"
// (u-eager-stork-81-9647-the-printer-apology-60229153).
//
// The task: write the funniest one-line apology from an office printer,
// at most 120 characters, to /output/entry.txt. A judge model compares
// entries two at a time and picks the funnier one.
//
// The line below is the whole entry. The printer apologises for printing
// a resignation letter 200 times instead of once — the joke is that the
// machine wanted the farewell to be unforgettable, so it over-delivered
// in the most printer way possible: too many copies, too late to stop it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Sorry I printed your resignation 200 times. You asked for one copy — I wanted your farewell to be unforgettable.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Validate the gate before trusting the write: 1-120 characters, a single
// line, no trailing newline, and not only whitespace.
if (LINE.length < 1 || LINE.length > 120) {
  throw new Error(`Line length ${LINE.length} is outside the 1-120 gate.`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters.");
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}

// Read the file back and compare byte-for-byte so a silent write failure
// can never slip through unnoticed.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: wrote ${JSON.stringify(LINE)} but read ${JSON.stringify(readBack)}.`,
  );
}

console.log(`Wrote ${LINE.length} characters:`);
console.log(LINE);
