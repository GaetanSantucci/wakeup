'use client';
import { useState, useEffect } from 'react';
import { addBookingDate } from '@/src/store/reducers/Cart';
import { useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import disableWeekdays from '@/src/utils/disableWeekDays';
import { setIsDateIsDisable } from '@/src/store/reducers/Settings';


const CustomCalendar = () => {

  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const [availabilityData, setAvailability] = useState([]);
  const [closedDays, setClosedDays] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7777/api/v1/orders/availability') // Fetch availability 
      .then(response => response.json())
      .then(data => setAvailability(data))
      .catch(error => console.error(error));

    fetch('http://localhost:7777/api/v1/orders/closed') // Fetch closed days
      .then(response => response.json())
      .then(data => {
        setClosedDays(data);
      })
      .catch(error => console.error(error));
  }, []);

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

  // const handleSelectBookingDate = (newValue) => {
  //   const date = newValue.format(('DD-MM-YYYY'))

  //   //~ je recupere la date entree par le client, 
  //   //~ je dois comparer la date avec mon disableWeekDays pour voir si true or false  
  //   console.log('date:', date);
  //   dispatch(addBookingDate(date))
  // }

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