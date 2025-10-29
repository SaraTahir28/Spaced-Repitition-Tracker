// Returns a list of user IDs
export function getUserIds() {
  return ["1", "2", "3", "4", "5"];
}

// Spaced Repetition Function (UTC-safe, month overflow fixed)
export function calculateRevisionDates(startDateStr) {
  if (!startDateStr) throw new Error("Date is required");


  const [year, month, day] = startDateStr.split("-").map(Number);

 //Date.UTC creates a UTC timestamp on(year, month, day)
  const startDate = new Date(Date.UTC(year, month - 1, day)); //new Date(timestamp)-Creates a Date object from that UTC moment 

  // Today's date for filtering (UTC midnight)
  const today = new Date(); //Creates a Date object for today. 
  today.setUTCHours(0, 0, 0, 0);//sets date object  to midnight UTC.so we only compare dates and not times.

  // Spaced repetition schedule
  const schedule = [
    { days: 7 },
    { months: 1 },
    { months: 3 },
    { months: 6 },
    { years: 1 },
  ];

  const revisionDates = [];

  // Loop through each interval in schedules array
  schedule.forEach((interval) => {
    const newDate = new Date(startDate); // new copy of start date for each interval so we don't change the original start date.

    // Add days
    if (interval.days) {
      newDate.setUTCDate(newDate.getUTCDate() + interval.days); //getUTCDate() + interval.days- gets the day from the date and adds days to it then setUTCdate updates are newDate date object
    }

    // Add months with overflow fix
    if (interval.months) {
      const originalDay = newDate.getUTCDate(); //stores the day of the month, the date started on, gives a number.
      newDate.setUTCMonth(newDate.getUTCMonth() + interval.months); //JS tries to keep the same day number in the new month.

      // Clamp to last day if original day doesn't exist in target month
      if (newDate.getUTCDate() < originalDay) { //modified newDate obj after adding months, we get date from it if its overflown to next month, its smaller than original day.
        newDate.setUTCDate(0); // day 0 in JS mean go to → last day of previous month (target month)
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
