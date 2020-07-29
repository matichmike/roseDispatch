import React from 'react';
import { Accum } from '../helpers/reportAccum';

const taskTypes = ["Pick-up", "Drop-off", "Other"];

const createReport = (viewModel, period) => {
  const accum = new Accum(period, taskTypes);
  const { activeDriver, driverTimeline, tasks } = viewModel;
  const driverYear = driverTimeline[activeDriver];
  for (let i = 0; i < 52; i++) {
    const week = driverYear[i];
    const { days } = week;
    for (let j = 0; j < 7; j++) {
      const { hours } = days[j];
      let allTasks = new Set();
      for (let h = 0; h < 24; h++) {
        const task = hours[h];
        if (task) {
          allTasks.add(task);
        }
      }
      const map = new Map();
      for (let taskType of taskTypes) {
        map.set(taskType, { count: 0 });
      }

      if (allTasks.size) {
        allTasks = Array.from(allTasks).map(id => tasks.get(id));
        allTasks.forEach(t => {
          map.get(t.type).count++;
        });
        
      }
      const dayRecords = Array.from(map.entries()).map(x => ({ type: x[0], count: x[1].count }));
        accum.addDayRecords(dayRecords);
    }
  }
  return accum.print();
}

const downloadReport = (csvText) => {

  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvText));
  element.setAttribute('download', 'report.csv');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

}

export default ({ viewModel }) => {
  const scheduleInput = React.useRef();

  return (
    <>
      <select className="form-control" ref={scheduleInput} name="Schedule Input">
        <option value="2">2 days</option>
        <option value="4">4 days</option>
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="28">28 days</option>
      </select>
      <button className='btn btn-success' onClick={() => {
          const period = Number.parseInt(scheduleInput.current.value);
          const report = createReport(viewModel, period);
          downloadReport(report);   
      }}>
        CSV
      </button>
    </>
  )
}