import fs from "node:fs";
import assert from "node:assert/strict";

const html = fs.readFileSync("index.html", "utf8");
const js = fs.readFileSync("js/app.js", "utf8");
const css = fs.readFileSync("css/styles.css", "utf8");

assert.match(html, /id="searchInput"/);
assert.match(html, /id="categoryFilter"/);
assert.match(html, /id="bookForm"/);
assert.match(html, /id="bookList"/);
assert.match(html, /js\/app\.js/);

assert.match(js, /localStorage/);
assert.match(js, /data-action="issue"/);
assert.match(js, /data-action="return"/);
assert.match(js, /function handleAddBook/);

assert.match(css, /\.book-card/);
assert.match(css, /\.stats-grid/);

console.log("OpenShelf smoke test passed.");
