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
    buildContactMailto("anton@example.com"),
    "mailto:support@exyr.io?subject=Exyr%20early%20access&body=Please%20add%20anton%40example.com%20to%20the%20Exyr%20early-access%20list.",
  );
});
