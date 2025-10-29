import { getUserIds, calculateRevisionDates } from "./common.mjs";
import assert from "node:assert";
import test from "node:test";


test("revision dates are calculated correctly according to schedule", () => {
  const startDate = "2026-01-01";
  const result = calculateRevisionDates(startDate); // Call our function to get the actual calculated revision dates

  // Expected dates (based on schedule)
  const expectedDates = [
  "2026-01-08", // +7 days
  "2026-02-01", // +1 month
  "2026-04-01", // +3 months
  "2026-07-01", // +6 months
  "2027-01-01", // +1 year
];

  for (let i = 0; i < expectedDates.length; i++) {
    assert.strictEqual( //assert.strictEqual(a, b, message) checks if a === b.
      result[i].date, //actual date from the function output
      expectedDates[i],// expected correct date
      `Revision date ${i + 1} should be ${expectedDates[i]} but got ${result[i].date}`//message printed
    );
  }
});
test("all revision dates are today or in the future", () => {
  const result = calculateRevisionDates("2026-01-01"); //The function returns an array of revision date objects
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const entry of result) { //entry is one revision object.
    const revisionDate = new Date(entry.date); //converts date string "2026-01-01" into a real Date object
    revisionDate.setHours(0, 0, 0, 0);
    assert.strictEqual(
      revisionDate.getTime() >= today.getTime(), //.getTime() converts the date into a timestamp so they are a number and can be compared.

      true,
      `Date ${entry.date} should not be in the past`
    );
  }
});