'use client';
import { useState, useEffect } from 'react';
import { addBookingDate } from '@/src/store/reducers/Cart';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import disableWeekdays from '@/src/utils/disableWeekDays';
import { setIsDateIsDisable } from '@/src/store/reducers/Settings';



/**
 * CustomCalendar component displays a date picker that allows users to select a booking date.
 * It fetches availability and closed days data from the server and disables unavailable dates.
 * @returns {JSX.Element} A date picker component wrapped in a theme provider and localization provider.
 */
const CustomCalendar = () => {

  const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
  const dispatch = useDispatch();

  // State variables for selected date, availability data, and closed days
  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityData, setAvailability] = useState([]);
  const [closedDays, setClosedDays] = useState([]);

  // Fetch availability and closed days data from the server on component mount
  useEffect(() => {
    fetch(`${endpoint}/orders/availability`) // Fetch availability 
      .then(response => response.json())
      .then(data => setAvailability(data))
      .catch(error => console.error(error));

    fetch(`${endpoint}/orders/closed`) // Fetch closed days
      .then(response => response.json())
      .then(data => {
        setClosedDays(data);
      })
      .catch(error => console.error(error));
  }, []);

  // Create a custom theme for the date picker
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
    }
  });

  // Handle the selection of a booking date
  const handleSelectBookingDate = (newValue) => {
    const selectedDate = newValue.toDate(); // Convert newValue to a JavaScript Date object
    const isDateDisabled = disableWeekdays(availabilityData, closedDays)(selectedDate);
    dispatch(setIsDateIsDisable(false))
    if (isDateDisabled) {
      // Display an error or take appropriate action
      dispatch(setIsDateIsDisable(true))
      // You can set an error state and display it to the user, or show a message, etc.
    } else {
      const date = newValue.format('DD-MM-YYYY');
      dispatch(addBookingDate(date));
    }
  };

  // Render the date picker wrapped in a theme provider and localization provider
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Choisissez votre date"
          value={selectedDate}
          onChange={(newValue) => handleSelectBookingDate(newValue)}
          shouldDisableDate={disableWeekdays(availabilityData, closedDays)}
          format="DD-MM-YYYY"
          slotProps={{ textField: { size: 'small' } }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export { CustomCalendar };