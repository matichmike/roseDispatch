// helper function that builds the year as 52 weeks -> 7 weeks -> 24 hours nested structure
const buildWeek = () => {
  const days = [];
  for (let i = 0; i < 7; ++i) {
    days.push({
      hours: new Array(24)
    })
  }
  return days;
}

const buildYear = () => {
  const weeks = [];
  for (let i = 0; i < 52; ++i) {
    weeks.push({
      days: buildWeek()
    })
  }
  return weeks;
}

export default buildYear;