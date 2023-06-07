'use client';
import styles from '/public/styles/Checkout.module.scss';

import { CartItem } from '@/src/components/CartItem';

export default function Checkout() {
  return (
    <div className={styles.container}>
      <div className={styles.container_order}>
        <h3 className={styles.container_order_title}>Votre commande</h3>
        <CartItem />
      </div>
      <div className={styles.container_calendar}></div>
    </div>
  );
}
