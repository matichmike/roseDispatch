import React from 'react';
import { observer } from 'mobx-react';

export default observer(({ viewModel }) => {
  return (
    <>
      <button className='btn btn-primary' onClick={() => {
        if(viewModel.activeWeek<2) {
          return;
        }
        viewModel.activeWeek--
      }}>
        &#8592;
      </button>
      <label className='card-header'>Week {viewModel.activeWeek}</label>
      <button className='btn btn-success' onClick={() => {
        if(viewModel.activeWeek>51) {
          return;
        }
        viewModel.activeWeek++
      }}>
        &#8594;
      </button>
    </>
    )
})