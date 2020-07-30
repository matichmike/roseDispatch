// component that switches the active driver
import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ viewModel }) => {
  return (
    <div>
        <form>
          <select className="form-control" value={viewModel.activeDriver} name="Drivers" id="Drivers" onChange={(e) => {
              const value = e.target.value; 
              viewModel.activeDriver = value;
          }}>
            { viewModel.drivers.map((driver, i) => <option key={`${driver}-${i}`} value={driver}>{driver}</option> ) }
          </select>
        </form>
      </div>
  );
});
