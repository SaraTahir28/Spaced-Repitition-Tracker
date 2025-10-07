export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Spaced Repetition Function 
export function calculateRevisionDates(startDateStr) {
  
  const startDate = new Date(startDateStr); //new Date() gives you the current date and time, according to the user’s computer clock.

  // Today's date (midnight UTC, to ignore time differences)
  const today = new Date(); 
  today.setHours(0, 0, 0, 0); //only compare dates, set time to midnight.

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

    //Only include dates that are today or in the future
    const dateOnly = new Date(newDate);
    dateOnly.setHours(0, 0, 0, 0);
    if (dateOnly >= today) {
      revisionDates.push({
        topic: "",
        date: formatted,
      });
    }
  });

  return revisionDates;
}
    
