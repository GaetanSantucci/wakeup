'use client';
import styles from '@/src/components/Checkout/Checkout.module.scss';

import {
  CheckoutCart,
  CheckoutInformation,
  CheckoutPayment,
} from '@/src/components/Checkout';
import { CheckoutProgressBar } from '@/src/components/Checkout/ProgressBar';
import { useState } from 'react';

import { useSelector } from 'react-redux';

export default function Checkout() {
  const cart = useSelector((state) => state.cart.cart);

  const [cartModale, setCartModale] = useState(true);
  const [informationModale, setInformationModale] = useState(false);
  const [paymentModale, setPaymentModale] = useState(false);

  return (
    <div className={styles.container}>
      <CheckoutProgressBar
        cartModale={cartModale}
        informationModale={informationModale}
        paymentModale={paymentModale}
      />

      {cartModale && <CheckoutCart />}
      {informationModale && <CheckoutInformation />}
      {paymentModale && <CheckoutPayment />}
    </div>
  );
}
