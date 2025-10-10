export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Spaced Repetition Function
export function calculateRevisionDates(startDateStr) {
  if (!startDateStr) throw new Error("Date is required");

  // Parse input date manually
  const [year, month, day] = startDateStr.split("-").map(Number);

  // Today's date for filtering
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Spaced repetition schedule
  const schedule = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  const revisionDates = [];

  // Helper to format date as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().slice(0, 10);

  schedule.forEach((interval) => {
    let newDate;

    if (interval.days) {
      // Add days
      newDate = new Date(Date.UTC(year, month - 1, day + interval.days));
    } else if (interval.months) {
      // Add months
      newDate = new Date(Date.UTC(year, month - 1 + interval.months, day));
    } else if (interval.years) {
      // Add years
      newDate = new Date(Date.UTC(year + interval.years, month - 1, day));
    }

    // Only include dates today or in the future
    const dateOnly = new Date(newDate);
    dateOnly.setHours(0, 0, 0, 0);
    if (dateOnly >= today) {
      revisionDates.push({
        topic: "",
        date: formatDate(newDate),
      });
    }
  });

  return revisionDates;
}
