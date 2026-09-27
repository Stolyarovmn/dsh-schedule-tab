import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const sourceDir = new URL("../src/client/", import.meta.url);
const outputFile = new URL("../lib/client.js", import.meta.url);
const header = "window.__ModuleLoader__.load({\n\tid: \"@stolyarovmn/dsh-client-ui-schedule-tab\",\n\tfactory: (require) => {\n\t\tvar module = { exports: {} };\n\t\tvar exports = module.exports;\n";
const footer = "\t\treturn module.exports;\n\t}\n});\n";

const parts = readdirSync(sourceDir)
  .filter((name) => /^\d{2}-.+\.js$/.test(name))
  .sort();

if (parts.length === 0) throw new Error("no client source fragments found");

const body = parts
  .map((name) => readFileSync(new URL(name, sourceDir), "utf8"))
  .join("");

const bundle = header + body + footer;

if (process.argv.includes("--check")) {
  const current = readFileSync(outputFile, "utf8");
  if (current !== bundle) {
    console.error("lib/client.js is out of date. Run: npm run build:client");
    process.exit(1);
  }
  console.log("client bundle is up to date");
} else {
  writeFileSync(outputFile, bundle);
  console.log("wrote lib/client.js");
}
