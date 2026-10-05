import assert from "node:assert/strict";
import test from "node:test";
import { buildContactMailto, validateContactEmail } from "../src/lib/contact.js";
import { formatPrice, getPlanPrice } from "../src/lib/pricing.js";

test("pricing switches between monthly and annual rates", () => {
  assert.equal(getPlanPrice({ annual: false }), 15);
  assert.equal(getPlanPrice({ annual: true }), 12);
  assert.equal(formatPrice(12), "$12");
});

test("contact form validates and normalizes email", () => {
  assert.deepEqual(validateContactEmail(""), { ok: false, error: "Enter your work email." });
  assert.deepEqual(validateContactEmail("anton@"), { ok: false, error: "Enter a valid email address." });
  assert.deepEqual(validateContactEmail("  anton@example.com "), { ok: true, email: "anton@example.com" });
  assert.equal(
    buildContactMailto("anton@example.com", "Pro"),
    "mailto:taboopip@gmail.com?subject=Exyr%20portfolio%20demo%20%E2%80%94%20Pro&body=Portfolio%20inquiry%20from%20anton%40example.com.%20Selected%20demo%20plan%3A%20Pro.%20This%20is%20not%20a%20beta%20registration%20or%20purchase.",
  );
});
