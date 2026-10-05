import assert from "node:assert/strict";
import test from "node:test";
import { productContent } from "../src/content.js";

function stringsIn(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(stringsIn);
  if (value && typeof value === "object") return Object.values(value).flatMap(stringsIn);
  return [];
}

test("production copy contains no template placeholders", () => {
  const copy = stringsIn(productContent);
  assert.ok(copy.length >= 40, "expected complete landing-page copy");
  assert.equal(copy.some((value) => /lorem|ipsum|excepteur|suspendisse|vulputate|venenatis/i.test(value)), false);
});

test("every marketing action resolves to a real section", () => {
  const sectionIds = new Set(productContent.sections);
  for (const action of productContent.actions) {
    assert.ok(sectionIds.has(action.target), `${action.label} targets missing section ${action.target}`);
  }
});
test("published discovery links consistently use the verified Pages host", async () => {
  const { readFile } = await import("node:fs/promises");
  const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
  const html = await read("index.html");
  assert.match(html, /rel="canonical" href="https:\/\/exyr-anton\.pages\.dev\/"/);
  assert.match(html, /property="og:url" content="https:\/\/exyr-anton\.pages\.dev\/"/);
  for (const path of ["index.html", "public/robots.txt", "public/sitemap.xml", "README.md", "docs/agent-handoff.md"]) {
    const text = await read(path);
    assert.ok(text.includes("https://exyr-anton.pages.dev/"), `${path} must publish the Pages URL`);
    assert.ok(!text.includes("chatgpt.site"), `${path} must not publish the retired hostname`);
  }
});
test("search and share metadata describe a non-commercial portfolio, not a signup", async () => {
  const { readFile } = await import("node:fs/promises");
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  for (const key of ["description", "og:description", "twitter:description"]) {
    const content = html.match(new RegExp(`(?:name|property)="${key}" content="([^"]+)"`))?.[1];
    assert.ok(content, `${key} is present`);
    assert.match(content, /non-commercial portfolio/i);
    assert.doesNotMatch(content, /early-access|join|beta/i);
  }
  assert.match(html, /<title>Exyr — Non-Commercial Portfolio Demo<\/title>/);
});
