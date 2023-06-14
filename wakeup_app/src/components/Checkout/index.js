'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { AddOrDeleteItems } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/libs/getCartTotal';
import Link from 'next/link';
import { ProfileModale } from '../Modale';

const CheckoutCart = () => {
  const cart = useSelector((state) => state.cart.cart)
  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Résumé de votre commande</h3>
        {
          cart.map(elem => {
            return (
              <div className='cart_modale_item' style={{ width: "100%" }} key={elem.name}>
                <div className='cart_modale_item_img'>
                  <Image src={`/images/${elem.img}`} alt={elem.name} width={50} height={75} />
                </div>
                <div className='cart_modale_item_desc'>
                  <p>{elem.name}</p>
                  <AddOrDeleteItems cart={elem} />
                </div>
              </div>
            )
          })
        }
        {
          getTotal(cart).totalQuantity === 0 ? <p>Votre panier est vide, commencez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
            :
            <>
              <p className={styles.container_checkout_desc}>Nombre d&apos;articles dans votre panier : {getTotal(cart).totalQuantity}</p>
              <p className={styles.container_checkout_desc}>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span>€</span></p>
            </>
        }
      </div>
      <div className={styles.container_calendar}>
        <CustomCalendar />
      </div>
    </>
  )
}

const CheckoutInformation = () => {
  const user = useSelector((state) => state.user)
  return (
    <ProfileModale />
  )
}

const CheckoutPayment = () => {
  const cart = useSelector((state) => state.cart.cart)

  return (
    <StripeButton cart={cart} />
  )
}

export { CheckoutCart, CheckoutInformation, CheckoutPayment }