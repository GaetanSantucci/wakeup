'use client';
import styles from '/public/styles/Checkout.module.scss';

import { BookingCalendar } from '@/src/components/Calendar';
import { CartItem } from '@/src/components/CartItem';
import { useSelector } from 'react-redux';

export default function Checkout() {

  const cartItems = useSelector((state) => Object.values(state.cart.cartItems))
  console.log('cartItems:', cartItems);

  return (
    <div className={styles.container}>
      <div className={styles.container_order}>
        <h3 className={styles.container_order_title}>Votre commande</h3>
          <CartItem />
      </div>
      <BookingCalendar />
    </div>
  )
}