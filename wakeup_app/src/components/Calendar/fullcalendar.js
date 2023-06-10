'use client';
import './calendar.scss'
import { useState, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import moment from 'moment';

import interactionPlugin from '@fullcalendar/interaction';

import { useDispatch } from 'react-redux';
import { addNewBookingDate } from '@/src/store/reducers/Cart';



const BookingCalendar = () => {
  const dispatch = useDispatch();

  const [availability, setAvailability] = useState([]);
  const [closedDays, setClosedDays] = useState([]);
  console.log('closedDays:', closedDays);

  useEffect(() => {

    // Fetch availability data from API
    fetch('http://localhost:7777/api/v1/orders')
      .then(response => response.json())
      .then(data => {
        setAvailability(data);
      })
      .catch(error => console.error(error));

    // Fetch closed days from API
    fetch('http://localhost:7777/api/v1/closed')
      .then(response => response.json())
      .then(data => {
        setClosedDays(data);
      })
      .catch(error => console.error(error));
  }, []);

  function generateWeekendEvents() {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().add(6, 'months').endOf('month');

    const weekends = [];
    let currentDay = moment(startOfMonth).startOf('week').add(5, 'days');

    while (currentDay.isBefore(endOfMonth)) {
      const currentDate = currentDay.format('YYYY-MM-DD');


      const availabilityOnDate = availability.find(a => moment(a.booking_date).format('YYYY-MM-DD') === currentDate); // Check if the current date matches the booking date and plate quantity is 12
      const isPlateQuantity12 = availabilityOnDate && availabilityOnDate.plate_quantity >= 12;


      const isWithin24Hours = moment(currentDate).isBefore(moment().add(24, 'hours')); // Check if the date is within 24 hours from now

      // Check if the date is a closed day
      const isClosedDay = closedDays.some(day => moment(day.closing_date).isSame(currentDate, 'day'));


      // Set the color of the event based on the plate quantity and constraints
      let color = 'green';
      if (isPlateQuantity12) {
        color = 'red';
      } else if (isWithin24Hours || isClosedDay) {
        color = 'gray';
      }


      if (currentDay.isoWeekday() === 6 || currentDay.isoWeekday() === 7) {
        weekends.push({
          start: currentDate,
          display: 'background',
          color,
          text: color,
        });
      }
      currentDay = moment(currentDay).add(1, 'days');
    }
    return weekends;
  }

  const handleSelect = (info) => {
    const { startStr } = info;
    dispatch(addNewBookingDate(startStr))
  }

  return (
    <FullCalendar
      editable
      selectable
      select={handleSelect}
      locale={frLocale}
      firstDay={1}
      plugins={[dayGridPlugin, interactionPlugin]}
      headerToolbar={{
        center: "prev next",
        end: "",
      }}
      views={["dayGridMonth"]}
      fixedWeekCount={false}
      events={generateWeekendEvents()}
    />
  );
}

export { BookingCalendar };
