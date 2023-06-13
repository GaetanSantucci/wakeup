'use client';
import { CustomCalendar } from '@/src/components';
import styles from '/public/styles/Checkout.module.scss';
import { CartItem } from '@/src/components/CartItem';
import { StripeButton } from '@/src/components/Button';
import { useSelector } from 'react-redux';

export default function Checkout() {
  const cart = useSelector((state) => state.cart.cart);
  const handleDateSelect = (date) => {
    setSelectedDay(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container_order}>
        <h3 className={styles.container_order_title}>Votre commande</h3>
        <CartItem />
      </div>
      <div className={styles.container_calendar}>
        <CustomCalendar />
      </div>
      <StripeButton cart={cart} />
    </div>
  );
}
