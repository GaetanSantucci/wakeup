'use client';

import styles from './Calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

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

import { createSpecialDay, fetchAllOrder, fetchClosedDays } from '@/src/libs/getOrderList';
import Link from 'next/link';
import { FlashOnOutlined } from '@mui/icons-material';

export const DashboardCalendar = () => {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEventModal, setAddEventModal] = useState(false);
  const [eventData, setEventData] = useState({ orders: [], closedDays: [] });

  // State for modal event management
  const [choice, setChoice] = useState('');
  const [newDate, setNewDate] = useState();
  const [refresh, setRefresh] = useState(false);
  const [numberOfPlates, setNumberOfPlates] = useState('')
  const [data, setData] = useState([]);

  // Function to fetch data
  const fetchData = () => {
    Promise.all([fetchAllOrder(), fetchClosedDays()])
      .then(([ordersData, closedDaysData]) => {
        setEventData({ orders: ordersData, closedDays: closedDaysData });
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    // Your code here that you want to execute when the page loads
    // or when refresh becomes true.
    fetchData();
    // Example: Fetch data from an API when the page loads or when refresh is true.
    if (refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);


  // Transform orders data into events
  const orderEvents = eventData.orders.map(elem => ({
    title: `${elem.user_lastname} ${elem.user_firstname} - ${elem.user_address.city}`,
    start: elem.booking_date,
    extendedProps: {
      orderInfo: elem
    }
  }));

  // Transform closed days data into events
  const closedDayEvents = eventData.closedDays.map(elem => {
    if (elem.closing_day) {
      return ({
        title: 'Jour fermé',
        start: elem.special_date,
        backgroundColor: '#ff4a4a',
        borderColor: '#ff4a4a',
        padding: '4px',
        extendedProps: {
          orderInfo: elem
        }
      })
    } else {
      return ({
        title: `Maximum de plateau ${elem.plate_quantity}`,
        start: elem.special_date,
        backgroundColor: '#ff8b50',
        borderColor: '#ff8b50',
        padding: '4px',
        extendedProps: {
          orderInfo: elem
        }
      })
    }
  }
  );

  // Merge the two arrays into one
  const allEvents = [...orderEvents, ...closedDayEvents];

  const handleEventClick = (eventClickInfo) => {
    if (eventClickInfo.event.extendedProps.orderInfo.user_id) {
      const orderInfo = eventClickInfo.event.extendedProps.orderInfo;
      setSelectedEvent(orderInfo);
      setIsModalOpen(true);
    }
  }



  const handleChangeChoice = (event) => {
    setChoice(event.target.value);

  };

  const confirmClosingDate = () => {
    const data = {
      date: newDate,
      plateQuantity: null,
      closingDay: true
    }
    createSpecialDay(data)
    setRefresh(true);
    setAddEventModal(false)
  }

  const modifySpecialDate = () => {
    const data = {
      date: newDate,
      plateQuantity: numberOfPlates
    }
    // todo Modifier la function pour creer un nouveau jour special
    createSpecialDay(data)
    setRefresh(true);
    setAddEventModal(false)
  }

  const handleChangeNumberOfPlates = (event) => {
    setNumberOfPlates(event.target.value)
  }


  const handleDateClick = (arg) => {
    const date = new Date(arg.date);
    const frenchFormattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setAddEventModal(true)
    setNewDate(arg.date)
  };

  const deleteEvent = () => {
    setIsModalOpen(false)
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
            <MenuItem value={3}>Modifier le nombre de plateau</MenuItem>
          </Select>
        </FormControl>
        <div className={styles.modale_content}>
          {
            choice === 1 ?
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>Es-tu sûre de vouloir fermer le {frenchFormattedDate} ?</Alert>
                <button onClick={confirmClosingDate}>Oui</button>
              </>
              :
              null
          }
          {
            choice === 2 ?
              <>

              </>
              :
              null
          }
          {
            choice === 3 ? <>
              <FormControl variant="standard" sx={{ mb: 3, width: '100%' }}>
                <InputLabel id="demo-simple-select-label">Nombre de plateaux maximum</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={numberOfPlates}
                  onChange={handleChangeNumberOfPlates}
                  inputProps={{ MenuProps: { disableScrollLock: true } }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                </Select>
              </FormControl>
              <Alert severity="warning" sx={{ mb: 2 }}>Es-tu sûre de vouloir modifier le nombre de plateau pour le {frenchFormattedDate} ?</Alert>
              <button onClick={modifySpecialDate}>Oui</button>
            </>
              :
              null
          }
        </div>
      </div>
    )
  }

  const EventModal = ({ event, onClose, onDelete }) => {

    const phone = event.user_phone.slice(1);

    const date = new Date(event.booking_date);
    const frenchFormattedDate = date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // todo changer refresh fetchorder au moment de l ajout d un event 

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
                  {product.product_name}: <span>{product.quantity}</span>
                </li>)
            })}
          </ul>
          <div className={styles.modale_content_price}>
            <p>Montant de la commande: <span>{event.total_amount}€</span></p>
          </div>
          <span className={styles.modale_content_delete} onClick={onDelete}><DeleteOutlineOutlinedIcon /> Supprimer</span>
        </div>
      </div>
    );
  };


  return (
    <>
      <div className={isModalOpen ? `${styles.background} ${styles.background_active}` : styles.background} />
      {
        isModalOpen &&
        <EventModal
          event={selectedEvent}
          onClose={() => setIsModalOpen(false)}
          onDelete={() => { deleteEvent }}
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