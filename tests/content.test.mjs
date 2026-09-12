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
