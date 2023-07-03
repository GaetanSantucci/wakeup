'use client';
import { useState, useEffect } from 'react';
import { addBookingDate } from '@/src/store/reducers/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import 'moment/locale/fr'; // import the French locale

import { useMediaQuery } from '@/src/hook/useMediaQuery';


const CustomCalendar = () => {

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityData, setAvailability] = useState([]);
  const [closedDays, setClosedDays] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7777/api/v1/orders') // Fetch availability 
      .then(response => response.json())
      .then(data => {
        setAvailability(data);
      })
      .catch(error => console.error(error));

    fetch('http://localhost:7777/api/v1/closed') // Fetch closed days
      .then(response => response.json())
      .then(data => {
        setClosedDays(data);
      })
      .catch(error => console.error(error));
  }, []);

  const isBreakpoint = useMediaQuery(768) // Custom hook to check screen size, return boolean
  let positionElement = 'fixed';
  let top = '0'
  if (isBreakpoint) {
    positionElement = 'absolute' // To display calendar in middle of the page
    top = '100px'
  }

  const theme = createTheme({
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            color: '#088519',
            fontSize: '0.8rem',
          },
          dayelected: {
            backgroundColor: '#ff00ff !important'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
          },
          color: '#252525 !important',
          notchedOutline: {
            borderColor: '#252525 !important'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: '#252525 !important'
          }
        }
      },
      MuiModal: {
        styleOverrides: {
          root: {
            position: positionElement, // custom css for mobile device
            top
          }
        }
      }
    }
  });

  const handleSelectBookingDate = (newValue) => {
    const date = newValue.format(('DD-MM-YYYY'))
    dispatch(addBookingDate(date))
  }

  moment.locale('fr'); // set the locale to French

  const disableWeekdays = (date) => {
    const day = moment(date).day(); // Get the day of the week for the given date
    const dateString = moment(date).format('YYYY-MM-DD'); // Format the date as a string in 'YYYY-MM-DD' format
    const availability = availabilityData.find((item) => item.booking_date.split('T')[0] === dateString); // Find the availability data for the given date
    const isClosedDay = closedDays.some((item) => item.closing_date.split('T')[0] === dateString); // Check if the date is a closed day
    const nextDay = moment().add(24, 'hours').format('YYYY-MM-DD'); // Get the next day's date in 'YYYY-MM-DD' format
    const isWithin24Hours = moment(dateString).isSameOrBefore(nextDay); // Check if the date is within 24 hours from now

    // Conditions to disable days according to the constraints
    if (day !== 6 && day !== 0) return true; // Disable weekdays (Saturday: 6, Sunday: 0)
    if (availability && parseInt(availability.plate_quantity) >= 12) return true; // Disable if plate quantity is greater than or equal to 12
    if (isWithin24Hours) return true; // Disable if the date is within 24 hours from now
    if (isClosedDay) return true; // Disable if it's a closed day

    return false; // Enable the date if none of the disabling conditions are met
  };
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Choisissez votre date"
          value={selectedDate}
          onChange={(newValue) => handleSelectBookingDate(newValue)}
          shouldDisableDate={disableWeekdays}
          format="DD-MM-YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export { CustomCalendar };