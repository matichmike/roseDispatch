import React from 'react';

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
      <button className='btn btn-success'>
        CSV
      </button>
    </>
  )
}