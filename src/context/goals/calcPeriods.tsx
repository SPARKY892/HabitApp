const calcPeriods = (goals) => {
  // console.log(goals[0]);
  const updatedGoals = goals.map((goal) => {
    const { completions } = goal;
    const completionDates = Object.keys(completions).sort();

    // Clean up existing startDate and endDate properties
    completionDates.forEach((date) => {
      if (completions[date].startingDay) {
        delete completions[date].startingDay;
      }
      if (completions[date].endingDay) {
        delete completions[date].endingDay;
      }
    });

    completionDates.forEach((date, index) => {
      const currentDate = completions[date];
      const prevDate =
        index > 0 ? completions[completionDates[index - 1]] : null;
      const nextDate =
        index < completionDates.length - 1
          ? completions[completionDates[index + 1]]
          : null;

      if (
        !prevDate ||
        new Date(date) - new Date(completionDates[index - 1]) >
          24 * 60 * 60 * 1000
      ) {
        currentDate.startingDay = true;
      }

      if (
        !nextDate ||
        new Date(completionDates[index + 1]) - new Date(date) >
          24 * 60 * 60 * 1000
      ) {
        currentDate.endingDay = true;
      }

      if (currentDate.startingDay && currentDate.endingDay) {
        // If startDate and endDate, it's the only date in the sequence
        currentDate.startingDay = true;
        currentDate.endingDay = true;
      }
    });
    return goal;
  });

  console.log(`updatedGoals: ${JSON.stringify(updatedGoals)}`);
  return updatedGoals;
};

export default calcPeriods;
