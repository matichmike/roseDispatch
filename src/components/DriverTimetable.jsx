import React from 'react';
import { observer } from 'mobx-react';

export const getDriverDay = (viewModel, day) => {
  const { activeDriver, activeWeek, driverTimeline } = viewModel;
  const currentDriverTimeline = driverTimeline[activeDriver];
  if (!currentDriverTimeline) {
    return;
  }
  return currentDriverTimeline[activeWeek].days[day];
}

export const getTaskByDayTime = (viewModel, day, hour) => {
  const { tasks } = viewModel;
  const taskId = getDriverDay(viewModel, day).hours[hour];
  const task = tasks.get(taskId);
  return task;
}

export default observer(({ viewModel }) => {
// razbit viewmodel make it obvious blyat, peredat active week v drivertimetable
// loop through this raspisanie i stroit table/destructure
// make a copy of destructured vars if (!task) => pustoy td else 31
  const rows = [];
  const renderedTasks = {};
  for (let hour = 0; hour < 25; hour++) {
    const columns = [<td>{hour}:00</td>];
    for (let day = 0; day < 7; day++) {
        //.... todo // 34 snachala delete from timetable a potom tasks: i postavit undefined
      let task = getTaskByDayTime(viewModel, day, hour); 
      let deleteBtn = null;
      if (!renderedTasks[task]) {
        renderedTasks[task] = true;
        deleteBtn = <button onClick={() => {}}>delete</button>;
      }
      if (task) {
        task = <div>{task.type} - {task.description} {deleteBtn}</div>
      }

      columns.push(<td>{task || '-'}</td>)
    }
    rows.push(<tr>
      {columns}
    </tr>)
  }

  return (
    <div>
      <table style={{ width: '100%' }}>
        <tr>
          <th></th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
          <th>Saturday</th>
          <th>Sunday</th>
        </tr>
        {rows}
      </table>
    </div>
  )
})
