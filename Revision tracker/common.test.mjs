import { getUserIds,calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";

test("User count is correct", () => {
  assert.equal(getUserIds().length, 5);
});
//unit tests for a non-trivial function
test("returns an array of revision dates", () => {
  const result = calculateRevisionDates("2026-01-01");
  if (!Array.isArray(result)) throw new Error("Expected an array");
});


test("returns 5 spaced revision dates for a future start date", () => {
  const startDate = "2025-11-01";
  const result = calculateRevisionDates(startDate);
  if (result.length !== 5) throw new Error(`Expected 5 dates, got ${result.length}`);
});

test("dates are today or in the future", () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = calculateRevisionDates("2026-01-01");
  result.forEach(date => {
    if (new Date(date) < today) throw new Error("Date is in the past");
  });
});