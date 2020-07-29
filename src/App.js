import React, { useRef } from 'react';
import { observable } from 'mobx';
import buildYear from './helpers/yearBuilder';
import './App.css';
import DriverSelector from './components/DriverSelector';
import WeekToggle from './components/WeekToggle';
import DriverTimeTable from './components/DriverTimetable';
import DriverScheduleCSV from './components/DriverScheduleCSV';
import AddDriverTask from './components/AddDriverTask';

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
      <label className="card-header">Driver:</label>
      <DriverSelector viewModel={viewModel}></DriverSelector>
      </div>
      <div className="Week-Toggle">
        <WeekToggle viewModel={viewModel}></WeekToggle>
      </div>

      <div className="Download-Schedule">
        <DriverScheduleCSV viewModel={viewModel}></DriverScheduleCSV>
      
      </div>
    </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <AddDriverTask viewModel={viewModel}></AddDriverTask>
          </div>
          <div className="col-9">
            <DriverTimeTable viewModel={viewModel}></DriverTimeTable>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
