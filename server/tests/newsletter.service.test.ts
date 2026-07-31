import test from "node:test";
import assert from "node:assert/strict";

import { normalizeEmail } from "../src/services/newsletter.service.js";

test("normalizeEmail trims whitespace and lowercases the address", () => {
  assert.equal(normalizeEmail("  NEWS@Example.com  "), "news@example.com");
});

test("normalizeEmail rejects invalid emails", () => {
  assert.throws(() => normalizeEmail("not-an-email"), /Invalid email/);
});
