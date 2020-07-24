import React, {Component} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';


export default class EventCalendar extends Component {
  render() {
    return (
      <FullCalendar defaultView='dayGridMonth' plugins={[ dayGridPlugin]} events={[
        {title: 'Pickup something', date:'2020-07-30'}
      ]} />
    )
  }
}

