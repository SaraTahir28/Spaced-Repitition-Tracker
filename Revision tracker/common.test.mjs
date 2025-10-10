import { getUserIds, calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";


test("revision dates are calculated correctly according to schedule", () => {
  const startDate = "2026-01-01";
  const result = calculateRevisionDates(startDate);

  // Expected dates (based on schedule)
  const expectedDates = [
  "2026-01-08", // +7 days
  "2026-02-01", // +1 month
  "2026-04-01", // +3 months
  "2026-07-01", // +6 months
  "2027-01-01", // +1 year
];

  for (let i = 0; i < expectedDates.length; i++) {
    assert.strictEqual(
      result[i].date,
      expectedDates[i],
      `Revision date ${i + 1} should be ${expectedDates[i]} but got ${result[i].date}`
    );
  }
});
test("all revision dates are today or in the future", () => {
  const result = calculateRevisionDates("2026-01-01");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const entry of result) {
    const revisionDate = new Date(entry.date);
    revisionDate.setHours(0, 0, 0, 0);
    assert.strictEqual(
      revisionDate.getTime() >= today.getTime(),
      true,
      `Date ${entry.date} should not be in the past`
    );
  }
});