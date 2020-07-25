class Day {
  constructor() {
    this.hours = new Array(24); // [_, _, _, task_id, task_id, task_id, ... _] undefined
  }

  getHour(index) {
    return this.hours[index];
  }

  addTask(task, startHour, endHour) {
    for (let i = startHour; i <= endHour; i++) {
      this.hours[i] = task;
    }
  }
}

class Week {
  constructor() {
    this.days = [];
    for (let i = 0; i < 7; i++) {
      this.days.push(new Day());
    }
  }

  getDay(index) { // 6
    return this.days[index];
  }
}

class Year {
  constructor() {
    this.weeks = [];
    for (let i = 0; i < 52; i++) {
      this.days.push(new Week());
    }
  }

  getWeek(index) { // 10
    return this.weeks[index];
  }
}

function buildDay() {
  return new Array(24);
}

function buildWeek() {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(buildDay());
  }
  return days;
}

function buildYear() {
  const weeks = [];
  for (let i = 0; i < 52; i++) {
    weeks.push(buildWeek());
  }
  return weeks;
}

export default buildYear;
