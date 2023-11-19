import moment from 'moment';
import 'moment/locale/fr'; // import the French locale
moment.locale('fr'); // set the locale to French

const disableWeekdays = (availabilityData, closedDays) => (date) => {

  const day = moment(date).day(); // Get the day of the week for the given date
  const dateString = moment(date).format('YYYY-MM-DD'); // Format the date as a string in 'YYYY-MM-DD' format
  const availability = availabilityData.find((item) => item.booking_date.split('T')[0] === dateString); // Find the availability data for the given date
  const isClosedDay = closedDays.some((item) => {
    if (item.closing_day) return item.special_date.split('T')[0] === dateString
  }); // Check if the date is a closed day
  const specialDay = closedDays.filter((item) => {
    if (item.plate_quantity) return item.special_date.split('T')[0];/* return item.date.split('T')[0] === dateString */
  })
  const nextDay = moment().add(24, 'hours').format('YYYY-MM-DD'); // Get the next day's date in 'YYYY-MM-DD' format
  const isWithin24Hours = moment(dateString).isSameOrBefore(nextDay); // Check if the date is within 24 hours from now

  // Conditions to disable days according to the constraints
  if (day !== 6 && day !== 0) return true; // Disable weekdays (Saturday: 6, Sunday: 0)
  if (availability && parseInt(availability.plate_quantity) >= 10) return true;
  if (specialDay && parseInt(specialDay.plate_quantity) >= specialDay.plate_quantity) return true
  if (isWithin24Hours) return true; // Disable if the date is within 24 hours from now
  if (isClosedDay) return true; // Disable if it's a closed day

  return false; // Enable the date if none of the disabling conditions are met
};

export default disableWeekdays;