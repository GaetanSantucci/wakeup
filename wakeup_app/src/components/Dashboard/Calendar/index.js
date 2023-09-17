'use client';

import styles from './Calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import momentTimezonePlugin from '@fullcalendar/moment-timezone'

import { useEffect, useState } from 'react';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';

import { createNewClosingDay, fetchAllOrder, fetchClosedDays } from '@/src/libs/getOrderList';
import { getTotalPrice } from '@/src/libs/getCartTotal';
import Link from 'next/link';

export const DashboardCalendar = () => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [eventData, setEventData] = useState({ orders: [], closedDays: [] });

  // State for modal event management
  const [choice, setChoice] = useState('');
  const [newDate, setNewDate] = useState();
  const [data, setData] = useState([]);

  // Function to fetch data
  const fetchData = () => {
    Promise.all([fetchAllOrder(), fetchClosedDays()])
      .then(([ordersData, closedDaysData]) => {
        console.log('ordersData:', ordersData);
        setEventData({ orders: ordersData, closedDays: closedDaysData });
      })
      .catch(error => console.error(error));
  };

  // useEffect with an interval to refresh every 2 minutes
  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up an interval to fetch data every 2 minutes
    const intervalId = setInterval(() => {
      fetchData();
    }, 1 * 60 * 1000); // 2 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);


  // Transform orders data into events
  const orderEvents = eventData.orders.map(elem => ({
    title: `${elem.user_lastname} ${elem.user_firstname} - ${elem.user_address.city}`,
    start: elem.booking_date,
    extendedProps: {
      orderInfo: elem
    }
  }));

  // Transform closed days data into events
  const closedDayEvents = eventData.closedDays.map(elem => ({
    title: 'Jour fermé',
    start: elem.closing_date,
    backgroundColor: 'red',
    borderColor: 'red',
    padding: '4px',
    extendedProps: {
      orderInfo: elem
    }
  }));

  // Merge the two arrays into one
  const allEvents = [...orderEvents, ...closedDayEvents];

  const handleEventClick = (eventClickInfo) => {
    if (eventClickInfo.event.extendedProps.orderInfo.user_id) {
      const orderInfo = eventClickInfo.event.extendedProps.orderInfo;
      setSelectedEvent(orderInfo);
      setIsModalOpen(true);
    }
  }

  const EventModal = ({ event, onClose, onDelete }) => {

    const phone = event.user_phone.slice(1);

    const date = new Date(event.booking_date);
    const frenchFormattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const { totalPrice } = getTotalPrice(event);

    return (
      <div className={styles.modale}>
        <p className={styles.modale_close} onClick={onClose}><CloseIcon /></p>
        <div className={styles.modale_title}>Commande du {frenchFormattedDate}</div>

        <div className={styles.modale_content}>
          <p><span>Nom:</span> {event.user_lastname}</p>
          <p><span>Prénom:</span> {event.user_firstname}</p>
          <p><span>Adresse:</span> {event.user_address.line1}</p>
          {
            event.user_address.line2 && <p>Compléments: {event.user_address.line2}</p>
          }
          <p><span>Code postal:</span> {event.user_address.postcode}</p>
          <p><span>Ville:</span> {event.user_address.city}</p>
          <p><span>Tél:</span> {event.user_phone}</p>

          <div className={styles.modale_content_contact}>
            <Link href={`sms://+33${phone};?&body=Réservation WAKE UP !`}><SmsIcon /></Link>
            <Link href={`tel:+33${phone}`}><PhoneIcon /></Link>
          </div>
          <div className={styles.modale_content_line} />

          <ul >
            {event.products.map((product, index) => {
              return (
                <li key={index} className={styles.modale_content_product}>
                  {product.product_name}: <span>{product.total_order_quantity}</span>
                </li>)
            })}
          </ul>
          <div className={styles.modale_content_price}>
            <p>Montant de la commande: <span>{totalPrice.toFixed(2)}€</span></p>
          </div>
          <span className={styles.modale_content_delete} onClick={onDelete}><DeleteOutlineOutlinedIcon /> Supprimer</span>
        </div>
      </div>
    );
  };

  const handleChangeChoice = (event) => {
    setChoice(event.target.value);

  };

  const confirmClosingDate = () => {
    createNewClosingDay(newDate)
    setAddEventModal(false)
  }

  const AddEventModal = ({ onClose }) => {

    const date = new Date(newDate);
    const frenchFormattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <div className={styles.modale}>
        <p className={styles.modale_close} onClick={onClose}><CloseIcon /></p>
        <FormControl variant="standard" sx={{ mb: 3, width: '100%' }}>
          <InputLabel id="demo-simple-select-label">Que souhaites-tu faire ?</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={choice}
            onChange={handleChangeChoice}
            label="Que veux-tu faire ?"
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            <MenuItem value={1}>Ajouter une fermeture</MenuItem>
            <MenuItem value={2}>Créer une réservation</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.modale_content}>
          {
            choice === 1 ?
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>Tu souhaites fermer le {frenchFormattedDate} ?</Alert>
                <button onClick={confirmClosingDate}>Oui</button>
              </>
              :
              null
          }
          {
            choice === 2 ?
              <>
                <p>plusieurs inputs</p>
              </>
              :
              null
          }
        </div>
      </div>
    )
  }

  const handleDateClick = (arg) => {
    console.log('arg:', arg.date);
    const date = new Date(arg.date);
    const frenchFormattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    console.log('frenchFormattedDate:', frenchFormattedDate);
    setAddEventModal(true)
    setNewDate(arg.date)
    // createNewClosingDay(arg.date)
  };


  return (
    <>
      <div className={isModalOpen ? `${styles.background} ${styles.background_active}` : styles.background} />
      {
        isModalOpen &&
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onDelete={() => {
            // Implement event deletion logic here
            // You can use the event.user_id to identify and delete the event
            // After deletion, close the modal and update the calendar events
            setIsModalOpen(false);
          }}
        />
      }
      {
        addEventModal &&
        <AddEventModal
          onClose={() => {
            setChoice('');
            setAddEventModal(false)
          }}
        />

      }
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        timeZone='UTC'
        initialView='dayGridMonth'
        themeSystem={'lux'}
        firstDay={1}
        events={allEvents}
        editable={true}
        selectable={true}
        eventDisplay='block'
        locale={frLocale}
        fixedWeekCount={false}
        headerToolbar={{
          start: 'dayGridMonth,dayGridWeek,dayGridDay',
          center: 'title',
          end: 'today prev,next'
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
      />
    </>
  )
}