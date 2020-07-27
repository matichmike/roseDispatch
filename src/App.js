import React, { useRef } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { buildYear } from "./components/buildYear";
import { observable, transaction } from 'mobx';
import { observer } from "mobx-react";

const DriverSelector = observer(({ viewModel }) => {
  return (
    <div>
        <form>
          <select value={viewModel.activeDriver} name="Drivers" id="Drivers" onChange={(e) => {
              const value = e.target.value; 
              viewModel.activeDriver = value;
          }}>
            <option value="Driver Selection">Driver Selection</option>
            { viewModel.drivers.map((driver, i) => <option key={`${driver}-${i}`} value={driver}>{driver}</option> ) }
          </select>
        </form>
      </div>
  );
});

const getDriverDay = (viewModel, day) => {
  const { activeDriver, activeWeek, driverTimeline } = viewModel;
  const currentDriverTimeline = driverTimeline[activeDriver];
  if (!currentDriverTimeline) {
    return;
  }
  return currentDriverTimeline[activeWeek].days[day];
}

const getTaskByDayTime = (viewModel, day, hour) => {
  const { tasks } = viewModel;
  const taskId = getDriverDay(viewModel, day).hours[hour];
  const task = tasks.get(taskId);
  return task;
}

const DriverTimeTable = observer(({ viewModel }) =>{
  
  const rows = [];
  for (let hour = 0; hour < 25; ++hour) {
    const columns = [<td>{hour}:00</td>];
    for (let day = 0; day < 7; ++day) {
        //.... todo: 
      let task = getTaskByDayTime(viewModel, day, hour);  
      if (task) {
        task = <div>{task.type} - {task.description}</div>
      }
      columns.push(<td>{task || '-'}</td>)
    }
    rows.push(<tr>
      {columns}
    </tr>)
  }

  return (
    <div>
      <table>
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

const hoursRangeSelect = [];
for (let singleHour = 0; singleHour < 24; singleHour++) {
  hoursRangeSelect.push(singleHour);
}

const WeekToggle = observer(({ viewModel }) => {
  return (
    <div>
      <button onClick={() => {
        if(viewModel.activeWeek<2) {
          return;
        }
        viewModel.activeWeek--
      }}>
        Back
      </button>
      <label for="week">Week {viewModel.activeWeek}</label>
      <button onClick={() => {
        if(viewModel.activeWeek>51) {
          return;
        }
        viewModel.activeWeek++
      }}>
        Forward
      </button>
    </div>
    )
})

const DriverScheduleCSV = ({ viewModel }) => {
  const scheduleInput = React.useRef();

  return (
    <div>
      <select ref={scheduleInput} name="Schedule Input">
        <option value="2">2 days</option>
        <option value="4">4 days</option>
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="28">28 days</option>
      </select>
      <button>
        Download Schedule
      </button>

    </div>
  )
}

const AddDriverTask = ({ viewModel }) => {

  const typeInput = React.useRef();
  const locationInput = React.useRef();
  const descriptionInput = React.useRef();
  const daySelectInput = React.useRef();
  const hourFromSelect = React.useRef();
  const hourToSelect = React.useRef();

  return (
    <>
      <select ref={typeInput} name="Task Type">
            <option>Select Task Type</option>
            <option value="Pick-up">Pick-Up</option>
            <option value="Drop-off">Drop-Off</option>
            <option value="Other">Other</option>
      </select>
      <select ref={daySelectInput} name="Day Selection">
            <option>Select Day</option>
            <option value="0">Monday</option>
            <option value="1">Tuesday</option>
            <option value="2">Wednesday</option>
            <option value="3">Thursday</option>
            <option value="4">Friday</option>
            <option value="5">Saturday</option>
            <option value="6">Sunday</option>
      </select>
      <select ref={hourFromSelect} name="Hour From">
            <option>From</option>
            { hoursRangeSelect.map((i) => <option> {i}:00 </option> )}
      </select>
      <select ref={hourToSelect} name="Hour To">
            <option>To</option>
            { hoursRangeSelect.map((i) => <option> {i}:00 </option> )}
      </select>
      {/* todo: 1) day selector 2) hour selector I have problem with value?*/}
      <input ref={locationInput} name="location" type="text" placeholder="Location" />
      <input ref={descriptionInput} name="description" type="text" placeholder="Description" />
      <button  onClick={() => {
        const type = typeInput.current.value;
        if (!type) {
          return alert('Please select Type first');
        }
        const location = locationInput.current.value;
        const description = descriptionInput.current.value;
        const day = daySelectInput.current.value;
        const from = Number.parseInt(hourFromSelect.current.value);
        const to = Number.parseInt(hourToSelect.current.value);

        // !!!! use Number.parseInt()
        //  for day and hour selector
        
        // todo: assert TO < FROM !!!!!!
        if (to < from ) {
          return alert('Invalid time range!')
        }



         const driverDay = getDriverDay(viewModel, day);

         // todo: check overlaps
         // !!!!!
         // !!!!!

        const taskId = uuid();
        const newTask = {
          id: taskId,
          type,
          location,
          description
        };


        transaction(() => {
          viewModel.tasks.set(taskId, newTask);
          
          // if task is overriden completely - remove it from viewModel tasks

          for (let i = from; i <= to; i++) {
              driverDay.hours[i] = taskId;
          }

        });
      }}>Add new task</button>
    </>
  )
}

function App() {

  const { current: viewModel } = useRef(observable({
    drivers: ["John", "Ben", "Ken"],
    tasks: new Map(),
    activeDriver: "John",
    driverTimeline: {
      John: buildYear(),
      Ben: buildYear(),
      Ken: buildYear(),
    },
    activeWeek: 1
  }));

  return (
    <div className="Page">
    <div className="Control-Panel">
    <div className="Driver-Schedule">
      <label>Driver: </label>
      <DriverSelector viewModel={viewModel}></DriverSelector>
      </div>
      <div className="Week-Toggle">
        <WeekToggle viewModel={viewModel}></WeekToggle>
      </div>

      <div className="Download-Schedule">
        <DriverScheduleCSV viewModel={viewModel}></DriverScheduleCSV>
      
      </div>
    </div>
    <div className="Task-And-Timetable">
      <div className="Add-Task">
          <AddDriverTask viewModel={viewModel}></AddDriverTask>
        </div>
      <div classname="Driver-Timetable">
          <DriverTimeTable viewModel={viewModel}></DriverTimeTable>
        </div>
      </div>
    </div>
  );
}

export default App;
