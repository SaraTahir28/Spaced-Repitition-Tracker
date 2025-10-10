export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Spaced Repetition Function (UTC-safe, month overflow fixed)
export function calculateRevisionDates(startDateStr) {
  if (!startDateStr) throw new Error("Date is required");

  // Parse input strictly as UTC to avoid timezone issues
  const [year, month, day] = startDateStr.split("-").map(Number);
  const startDate = new Date(Date.UTC(year, month - 1, day));

  // Today's date for filtering (UTC midnight)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);


  // Spaced Repetition Function (UTC-safe, month overflow fixed)
export function calculateRevisionDates(startDateStr) {
  if (!startDateStr) throw new Error("Date is required");

  // Parse input strictly as UTC to avoid timezone issues
  const [year, month, day] = startDateStr.split("-").map(Number);
  const startDate = new Date(Date.UTC(year, month - 1, day));

  // Today's date for filtering (UTC midnight)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  // Spaced repetition schedule
  const schedule = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  const revisionDates = [];

  // Loop through each interval
  schedule.forEach((interval) => {
    const newDate = new Date(startDate); // copy original date

    // Add days
    if (interval.days) {
      newDate.setUTCDate(newDate.getUTCDate() + interval.days);
    }

    // Add months with overflow fix
    if (interval.months) {
      const originalDay = newDate.getUTCDate();
      newDate.setUTCMonth(newDate.getUTCMonth() + interval.months);

      // Clamp to last day if original day doesn't exist in target month
      if (newDate.getUTCDate() < originalDay) {
        newDate.setUTCDate(0); // day 0 → last day of previous month (target month)
      }
    }

    // Add years
    if (interval.years) {
      newDate.setUTCFullYear(newDate.getUTCFullYear() + interval.years);
    }

    // Only include today or future dates
    const dateOnly = new Date(newDate);
    dateOnly.setUTCHours(0, 0, 0, 0);
    if (dateOnly >= today) {
      revisionDates.push({
        topic: "",
        date: newDate.toISOString().slice(0, 10), // YYYY-MM-DD in UTC
      });
    }
  });

  return revisionDates;
}

