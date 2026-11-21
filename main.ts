// Passport of Valdoria — writes the entry image to the output dir.
// The spread (entry.png beside this file) is the deliverable: a data
// page with portrait and MRZ, plus a visa page with border stamps.
import { copyFileSync, existsSync, mkdirSync, statSync }
  from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
if (!existsSync(source)) {
  throw new Error("entry.png is missing beside main.ts");
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(source, dest);
const bytes = statSync(dest).size;
console.log("wrote", dest, bytes, "bytes");
