'use client';

import styles from './Calendar.module.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneIcon from '@mui/icons-material/Phone';

import { fetchAllOrder, fetchClosedDays } from '@/src/libs/getOrderList';
import { getTotalPrice } from '@/src/libs/getCartTotal';
import Link from 'next/link';
import { BorderColor } from '@mui/icons-material';

export const DashboardCalendar = () => {

  const [orders, setOrders] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [closedDays, setClosedDays] = useState(null);
  const [eventData, setEventData] = useState({ orders: [], closedDays: [] });
  console.log('eventData:', eventData);


  useEffect(() => {
    Promise.all([fetchAllOrder(), fetchClosedDays()])
      .then(([ordersData, closedDaysData]) => {
        setEventData({ orders: ordersData, closedDays: closedDaysData });
      })
      .catch(error => console.error(error));
  }, [])


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
    padding: '4px'
  }));

  // Merge the two arrays into one
  const allEvents = [...orderEvents, ...closedDayEvents];

  const handleEventClick = (eventClickInfo) => {
    const orderInfo = eventClickInfo.event.extendedProps.orderInfo;
    setSelectedEvent(orderInfo);
    setIsModalOpen(true);
  }

  const EventModal = ({ event, onClose, onDelete }) => {
    console.log('event:', event);

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
              console.log('product:', product);

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
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
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
        eventClick={handleEventClick}
        eventConstraint={close}

      />

    </>
  )
}