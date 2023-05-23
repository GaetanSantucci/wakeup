'use client';
import './calendar.scss'
import { useState, useEffect } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import frLocale from '@fullcalendar/core/locales/fr';
import moment from 'moment';

import interactionPlugin from '@fullcalendar/interaction';

import { useSelector, useDispatch } from 'react-redux';
import { addNewBookingDate } from '@/src/store/reducers/Cart';



const BookingCalendar = () => {
  const dispatch = useDispatch();


  // const { bookingDate } = useSelector((state) => state.cart)
  const [availability, setAvailability] = useState([]);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [events, setEvents] = useState([]);


  useEffect(() => {
    // Fetch availability data from API
    fetch('http://localhost:7777/api/v1/orders')
      .then(response => response.json())
      .then(data => {
        setAvailability(data);
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

      // Check if the current date matches the booking date and plate quantity is 12
      const availabilityOnDate = availability.find(a => moment(a.booking_date).format('YYYY-MM-DD') === currentDate);
      const isPlateQuantity12 = availabilityOnDate && availabilityOnDate.plate_quantity >= 12;

      // Set the color of the event based on the plate quantity
      const color = isPlateQuantity12 ? 'red' : 'green';

      if (currentDay.isoWeekday() === 6 || currentDay.isoWeekday() === 7) {
        weekends.push({
          start: currentDate,
          display: 'background',
          color
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
