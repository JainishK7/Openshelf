import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const required = [
  "README.md",
  "CONTRIBUTING.md",
  "CODE_OF_CONDUCT.md",
  "SECURITY.md",
  "LICENSE",
  ".gitignore",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/ISSUE_TEMPLATE/bug_report.md",
  ".github/ISSUE_TEMPLATE/feature_request.md",
  ".github/workflows/validate.yml",
  "docs/architecture.md",
  "docs/development.md",
  "docs/setup.md",
  "index.html",
  "css/styles.css",
  "js/app.js",
  "tests/smoke-test.mjs"
];

const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));

if (missing.length) {
  console.error("Repository validation failed. Missing files:");
  missing.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");
const contributing = fs.readFileSync(path.join(root, "CONTRIBUTING.md"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");

const checks = [
  ["README installation section", /##\s+Installation/i.test(readme)],
  ["README usage section", /##\s+Usage/i.test(readme)],
  ["README contribution reference", /CONTRIBUTING\.md/i.test(readme)],
  ["Branch convention", /feature\/\*/i.test(contributing)],
  ["Commit convention", /feat:/i.test(contributing)],
  ["Pull request workflow", /pull request/i.test(contributing)],
  ["HTML loads application script", /js\/app\.js/i.test(html)],
  ["HTML loads stylesheet", /css\/styles\.css/i.test(html)]
];

const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);

if (failed.length) {
  console.error("Repository content validation failed:");
  failed.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

console.log(`Repository validation passed: ${required.length} files and ${checks.length} content checks verified.`);
