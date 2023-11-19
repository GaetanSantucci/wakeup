'use client';
import styles from '@/src/components/Checkout/Checkout.module.scss';
import {
  CheckoutCart,
  CheckoutInformation,
  CheckoutPayment,
} from '@/src/components/Checkout';
import { CheckoutProgressBar } from '@/src/components/Checkout/ProgressBar';
import { useState } from 'react';

export default function Checkout() {
  const [cartModale, setCartModale] = useState(true);
  const [informationModale, setInformationModale] = useState(false);
  const [paymentModale, setPaymentModale] = useState(false);

  const handleNextPage = () => {
    if (cartModale) {
      setCartModale(false);
      setInformationModale(true);
    }
    if (informationModale) {
      setInformationModale(false);
      setPaymentModale(true);
    }
  };

  const handlePreviousPage = () => {
    if (informationModale) {
      setInformationModale(false);
      setCartModale(true);
    }
    if (paymentModale) {
      setPaymentModale(false);
      setInformationModale(true);
    }
  };

  return (
    <div className={styles.container}>
      <CheckoutProgressBar
        cartModale={cartModale}
        informationModale={informationModale}
        paymentModale={paymentModale}
      />
      {cartModale && <CheckoutCart nextPage={handleNextPage} />}
      {informationModale && (
        <CheckoutInformation
          nextPage={handleNextPage}
          previousPage={handlePreviousPage}
        />
      )}
      {paymentModale && <CheckoutPayment previousPage={handlePreviousPage} />}
    </div>
  );
}
