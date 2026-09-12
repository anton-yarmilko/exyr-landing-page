import assert from "node:assert/strict";
import test from "node:test";
import { validateContactEmail } from "../src/lib/contact.js";
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
});
