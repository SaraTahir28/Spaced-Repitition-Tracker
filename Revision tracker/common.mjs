export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Spaced Repetition Function 
export function calculateRevisionDates(startDateStr) {
  // Convert the date string (from input.value) to a Date object
  const startDate = new Date(startDateStr);

  // Define your spaced repetition schedule
  const schedule = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  const revisionDates = [];

  // Loop through each interval and calculate the future date
  schedule.forEach((interval) => {
    const newDate = new Date(startDate); // start from original date

    // Add days if specified
    if (interval.days) newDate.setDate(newDate.getDate() + interval.days);

    // Add months if specified
    if (interval.months) {
      const day = newDate.getDate();
      newDate.setMonth(newDate.getMonth() + interval.months);
      if (newDate.getDate() < day) newDate.setDate(0); // handle month overflow
    }

    // Add years if specified
    if (interval.years) newDate.setFullYear(newDate.getFullYear() + interval.years);

    // Convert date to "YYYY-MM-DD" string for storage
    const formatted = newDate.toISOString().slice(0, 10);

    revisionDates.push({
      topic: "", // we’ll fill the topic when calling this function
      date: formatted,
    });
  });

  return revisionDates;
}

