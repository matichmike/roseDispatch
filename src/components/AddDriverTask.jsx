import React from 'react';
import { v4 as uuid } from 'uuid';
import { transaction } from 'mobx';
import { getDriverDay } from './DriverTimetable'; 

const hoursRangeSelect = [];
for (let singleHour = 0; singleHour < 24; singleHour++) {
  hoursRangeSelect.push(singleHour);
}

export default ({ viewModel }) => {

  const typeInput = React.useRef();
  const locationInput = React.useRef();
  const descriptionInput = React.useRef();
  const daySelectInput = React.useRef();
  const hourFromSelect = React.useRef();
  const hourToSelect = React.useRef();

  return (
    <>
      <select required className="form-control" ref={typeInput} name="Task Type">
            <option>Select Task Type</option>
            <option value="Pick-up">Pick-Up</option>
            <option value="Drop-off">Drop-Off</option>
            <option value="Other">Other</option>
      </select>
      <select required className="form-control" ref={daySelectInput} name="Day Selection">
            <option>Select Day</option>
            <option value="0">Monday</option>
            <option value="1">Tuesday</option>
            <option value="2">Wednesday</option>
            <option value="3">Thursday</option>
            <option value="4">Friday</option>
            <option value="5">Saturday</option>
            <option value="6">Sunday</option>
      </select>
      <select required className="form-control" ref={hourFromSelect} name="Hour From">
            <option>From</option>
            { hoursRangeSelect.map((i) => <option> {i}:00 </option> )}
      </select>
      <select required className="form-control" ref={hourToSelect} name="Hour To">
            <option>To</option>
            { hoursRangeSelect.map((i) => <option> {i}:00 </option> )}
      </select>
      <input required className="form-control" ref={locationInput} name="location" type="text" placeholder="Location" />
      <input required className="form-control" ref={descriptionInput} name="description" type="text" placeholder="Description" />
      <button style={{ width: 'inherit' }}className='btn btn-success' onClick={() => {
        const type = typeInput.current.value;
        if (!type) {
          return alert('Please select Type first');
        }
        const location = locationInput.current.value;
        const description = descriptionInput.current.value;
        const day = daySelectInput.current.value;
        const from = Number.parseInt(hourFromSelect.current.value);
        const to = Number.parseInt(hourToSelect.current.value);

        if (to < from ) {
          return alert('Invalid time range!')
        }

        const driverDay = getDriverDay(viewModel, day);

        const overlappedTasks = new Set();
        for (let i = from; i <= to; i++) {
          const ot = driverDay.hours[i];
          if (ot) {
            overlappedTasks.add(ot);
          }
        }

        if (overlappedTasks.size) {
          if (!window.confirm('Do you wanna override existing tasks?')) {
            return;
          }
        }

        const taskId = uuid();
        const newTask = {
          id: taskId,
          type,
          location,
          description,
          driver: viewModel.activeDriver
        };

        transaction(() => {
          viewModel.tasks.set(taskId, newTask);
          
          // if task is overriden completely - remove it from viewModel tasks

          if (overlappedTasks.size) {
            for (let i = 0; i < 24; ++i) {
              const t = driverDay.hours[i];
              if (overlappedTasks.has(t)) {
                driverDay.hours[i] = null;
              }
              if (i >= from && i <= to) {
                driverDay.hours[i] = taskId;
              }
            }
            const deleted = Array.from(overlappedTasks);
            for (let toDelete of deleted) {
              viewModel.tasks.delete(toDelete);
            }
            // loop which will be deleting all tasks in set overlappedtasks and setting needed driver to task id
          }
          else {
            for (let i = from; i <= to; i++) {
              driverDay.hours[i] = taskId;
            }
          }
          
          
        });
      }}>Add new task</button>
    </>
  )
}