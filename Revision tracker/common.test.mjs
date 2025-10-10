import { getUserIds, calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

// Test 1: User count
test("User count is correct", () => {
  assert.strictEqual(getUserIds().length, 5, "Expected 5 users");
});

// Test 2: calculateRevisionDates returns an array
test("returns an array of revision dates", () => {
  const result = calculateRevisionDates("2026-01-01");
  assert.strictEqual(Array.isArray(result), true, "Expected an array");
});

// Test 3: calculateRevisionDates returns exactly 5 dates
test("returns 5 spaced revision dates for a future start date", () => {
  const startDate = "2025-11-01";
  const result = calculateRevisionDates(startDate);
  assert.strictEqual(result.length, 5, `Expected 5 dates, got ${result.length}`);
});

// Test 4: dates are today or in the future
test("dates are today or in the future", () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = calculateRevisionDates("2026-01-01");

  result.forEach(date => {
    const revisionDate = new Date(date);
    revisionDate.setHours(0, 0, 0, 0);
    assert.strictEqual(revisionDate >= today, true, `Date ${date} is in the past`);
  });
});
