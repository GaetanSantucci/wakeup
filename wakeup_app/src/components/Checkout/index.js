'use client';
import styles from './Checkout.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { useState, use } from 'react';
import { inputValue, setAddress } from '@/src/store/reducers/User';
import { addDeliveryCost } from '@/src/store/reducers/Cart';

import { AddOrDeleteItems, PayPalButtonComponent } from '../Button';
import { StripeButton } from '@/src/components/Button';
import { CustomCalendar } from '../Calendar';

import { getTotal } from '@/src/libs/getCartTotal';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import RoomIcon from '@mui/icons-material/Room';

import { getArea } from '/src/libs/getDeliveryArea.js';
import { useMediaQuery } from '@/src/hook/useMediaQuery';
import { Autocomplete } from '@mui/material';




const areaFetch = getArea(); // fetch to database for delivery area

const CheckoutCart = ({ nextPage }) => {
  const allCart = useSelector((state) => state.cart)

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Résumé de votre commande</h3>
        {
          allCart.cart.map(elem => {
            return (
              <div className='cart_modale_item' style={{ width: '100%' }} key={elem.name}>
                <div className='cart_modale_item_img'>
                  <Image src={`/images/${elem.img}.webp`} alt={elem.name} width={50} height={75} />
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
          getTotal(allCart.cart).totalQuantity === 0 ? <p>Votre panier est vide, commencez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
            :
            <>
              <p className={styles.container_checkout_desc}>Nombre d&apos;articles dans votre panier : {getTotal(allCart.cart).totalQuantity}</p>
              <p className={styles.container_checkout_desc}>Montant du panier : {getTotal(allCart.cart).totalPrice.toFixed(2)}<span>€</span></p>
              <div className={styles.container_calendar}>
                <CustomCalendar />
              </div>
            </>
        }
      </div>
      <div className={styles.checkout_button}>
        {allCart.bookingDate && <button onClick={nextPage}>Validez</button>}

      </div>
    </>
  )
}



const CheckoutInformation = ({ previousPage, nextPage }) => {

  const data = use(areaFetch);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user)

  // Dynamic method for store input by type
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    dispatch(inputValue({ inputType: id, value }));
  };

  // check if all my input are completed
  const isInformationComplete = () => {
    return (
      user.lastname &&
      user.firstname &&
      user.email &&
      user.phone &&
      user.address.line1 &&
      user.address.city
    );
  };

  const handleCity = (e, value) => {
    dispatch(inputValue({ inputType: 'city', value: value?.city }))
    dispatch(inputValue({ inputType: 'postcode', value: value?.postcode }))
    dispatch(addDeliveryCost(value?.price))
  }
  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Saisie de vos informations</h3>
        <form className={styles.container_checkout_form}>
          <div className={styles.container_checkout_form_50}>
            <TextField id='lastname'
              label='Nom'
              value={user.lastname}
              onChange={handleInputChange}
              variant='outlined'
              size='small'
              sx={{ mb: 2, width: '45%' }}
              required />
            <TextField id='firstname'
              label='Prénom'
              value={user.firstname}
              onChange={handleInputChange}
              variant='outlined'
              size='small'
              sx={{ mb: 2, width: '45%' }}
              required />
          </div>
          <div className={styles.container_checkout_form_50}>
            <TextField id='email'
              label='Email'
              value={user.email}
              onChange={handleInputChange}
              type='email'
              variant='outlined'
              size='small'
              sx={{ mb: 2, width: '45%' }}
              required />
            <TextField id='phone'
              label='Téléphone'
              value={user.phone}
              onChange={handleInputChange}
              type='tel'
              variant='outlined'
              size='small'
              sx={{ mb: 2, width: '45%' }}
              required />
          </div>
          <div className={styles.container_checkout_form_50}>
            <TextField
              id='line1'
              className={styles.container_information_input}
              label='Adresse'
              value={user.address?.line1}
              onChange={handleInputChange}
              variant='outlined'
              autoComplete='off'
              size='small'
              sx={{ mb: 2, width: '45%' }}
              required />
            <TextField id='line2'
              label='Bât., étage, interphone...'
              value={user.address?.line2}
              onChange={handleInputChange}
              variant='outlined'
              size='small'
              sx={{ mb: 2, width: '45%' }} />
          </div>

          <div className={styles.container_checkout_form_100}>
            <Autocomplete
              id="city"
              onChange={handleCity}
              sx={{ width: '45%' }}
              options={data}
              autoHighlight
              getOptionLabel={(option) => option.city}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} key={option.city}>
                  {option.city} - {option.postcode}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choisissez votre ville"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                  size='small'
                  onChange={handleCity}
                  value={user.address?.city}
                />
              )}
            />
            <div className={styles.container_information}>

            </div>
          </div>
        </form>
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
        {
          isInformationComplete() ?
            <button onClick={nextPage}>Validez</button> : null
        }

      </div>
    </>
  )
}

const CheckoutPayment = ({ previousPage }) => {
  const allCart = useSelector((state) => state.cart)
  const deliveryCost = allCart.deliveryCost.toString().replace('.', ',');
  const { user } = useSelector((state) => state.user)
  console.log('user:', user);

  const totalIncludeDelivery = Number(getTotal(allCart.cart).totalPrice.toFixed(2)) + Number(allCart.deliveryCost)
  console.log('totalIncludeDelivery:', totalIncludeDelivery);

  return (
    <>
      <div className={styles.container_checkout}>
        <h3 className={styles.container_checkout_title}>Choisissez votre mode de paiement</h3>
        <div className={styles.container_checkout_payment} >
          <div className={styles.container_checkout_payment_resume}>
            <p>Résumé :</p>
            <p>Livraison le {allCart.bookingDate}</p>
            <ul>
              {
                allCart.cart.map(item => {
                  const totalPrice = (item.quantity * item.price).toFixed(2);
                  const price = totalPrice.toString().replace('.', ',');
                  return (
                    <li key={item.name}>{item.quantity} {item.name} <span> total : {price} €</span></li>
                  )
                })
              }
            </ul>
            <p>Frais de livraison : {deliveryCost} €</p>
            <p>Montant total : {totalIncludeDelivery} €</p>
          </div>
          <div className={styles.container_checkout_payment_resume_button}>
            <StripeButton cart={allCart} />
            <PayPalButtonComponent />
          </div>
        </div>
      </div>
      <div className={styles.checkout_button}>
        <button onClick={previousPage}>Précédent</button>
      </div>
    </>
  )
}

export { CheckoutCart, CheckoutInformation, CheckoutPayment }