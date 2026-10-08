// Runs before `vsce package` (vscode:prepublish).
// 1. Copies the canonical skill from ../skills into this extension so chatSkills can load it
//    (chatSkills paths must resolve inside the extension).
// 2. Copies ../LICENSE.
// 3. Regenerates media/*.md (one per walkthrough step) from the guide's sections.
import { cpSync, rmSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ext = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repo = resolve(ext, "..");

rmSync(resolve(ext, "skills"), { recursive: true, force: true });
cpSync(resolve(repo, "skills/ship-your-site"), resolve(ext, "skills/ship-your-site"), { recursive: true });
cpSync(resolve(repo, "LICENSE"), resolve(ext, "LICENSE"));

const guide = readFileSync(resolve(repo, "skills/ship-your-site/references/GUIDE.md"), "utf8");
const sections = new Map();
for (const block of guide.split(/^(?=## )/m).slice(1)) {
  const heading = block.split("\n", 1)[0].replace(/^## /, "").trim();
  const body = block.replace(/\n---\s*$/s, "").trimEnd();
  sections.set(heading, body);
}

const steps = [
  ["step0", "Step 0:"],
  ["step1", "Step 1:"],
  ["step2", "Step 2:"],
  ["step3", "Step 3:"],
  ["step4", "Step 4:"],
  ["step5", "Step 5:"],
  ["step6", "Step 6:"],
  ["step7", "Step 7:"],
  ["step8", "Step 8:"],
  ["troubleshooting", "Common failures and fixes"],
];

const footer =
  "\n\n---\n\nAsk your AI agent: *\"Use the ship-your-site skill to help me with this step.\"*\n\nStuck? Free help at https://unblck.me\n";

mkdirSync(resolve(ext, "media"), { recursive: true });
for (const [file, prefix] of steps) {
  const key = [...sections.keys()].find((k) => k.startsWith(prefix));
  if (!key) throw new Error(`Guide section not found: ${prefix}`);
  writeFileSync(resolve(ext, "media", `${file}.md`), sections.get(key) + footer);
}
console.log(`sync-skill: copied skill + LICENSE, wrote ${steps.length} media files`);
