'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { fetchAllOrder } from '@/src/libs/getOrderList';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export const DashboardCalendar = () => {

  const [orders, setOrders] = useState([])
  console.log('orders:', orders);

  useEffect(() => {
    fetchAllOrder()
      .then(data => {
        setOrders(data);
      })
      .catch(error => console.error(error));
  }, [])

  if (!orders) {
    notFound();
  }

  const data = orders.map(elem => {
    return {
      title: elem.user_email,
      start: elem.booking_date
    }
  })
  console.log('data:', data);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      themeSystem='simplex'
      firstDay={1}
      events={data}
      timeFormat='H(:mm)'
    />
  )
}