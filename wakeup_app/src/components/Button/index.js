'use client';

import styles from './button.module.scss';

import { AddCartIcon } from '../ComponentSVG';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { removeItem, incrementQuantity, decrementQuantity } from '@/src/store/reducers/Cart';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import CreditCardIcon from '@mui/icons-material/CreditCard';

import { addToCart } from '@/src/store/reducers/Cart';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const AddCartButton = ({ items }) => {

  const [added, setAdded] = useState(false);

  const { id, name, price, img } = items;

  const dispatch = useDispatch();

  const handleChangeCartItem = () => {
    dispatch(addToCart({ id, name, price, img }))
    // for animate button on click event
    setAdded(true);
    // reset animation state
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      <button id={styles.add_cart_button} className={added ? `${styles.add}` : ''} onClick={handleChangeCartItem}>{added ? <CheckOutlinedIcon /> : <AddCartIcon />}</button>
    </>
  )
}

const AddOrDeleteItems = ({ cart }) => {
  const { id, quantity } = cart;
  const dispatch = useDispatch();

  const handleChangeIncreaseQty = (id) => dispatch(incrementQuantity(id));
  const handleChangeDecreaseQty = (id) => dispatch(decrementQuantity(id));
  const handleRemoveItem = (id) => dispatch(removeItem(id));
  return (
    <div className='cart_modale_item_quantity'>
      <div className='cart_modale_item_quantity_add'>
        <RemoveOutlinedIcon onClick={() => { handleChangeDecreaseQty(id) }} />
        {quantity <= 9 ? `0${quantity}` : quantity}
        <AddOutlinedIcon onClick={() => { handleChangeIncreaseQty(id) }} />
      </div>
      <DeleteOutlineOutlinedIcon className='cart_modale_item_quantity_delete' onClick={() => handleRemoveItem(id)} />
    </div>
  )
}

const StripeButton = ({ cart }) => {

  const router = useRouter();

  const handleCheckout = async () => {
    const userId = 'testUser-54541'
    // const endpoint = 'https://wakeupclf.fr/api/v1/contact'
    const endpoint = 'http://localhost:7777/api/v1/payment/stripe'

    axios.post(endpoint, {
      cart,
      userId
    }).then((res) => {
      if (res.data.url) {
        console.log('res.data.url:', res.data.url);
        window.location.replace(res.data.url)
      }
    }).catch((err) => console.log(err.message))
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cart, userId),
    // }

    // fetch(endpoint, options)
    //   .then(response => console.log('response.json():', response.json()))
    //   .then(data => console.log('Retour des data du fetch payment', data))

    // const response = await fetch(endpoint, options)
    // const result = await response.json()
    // console.log('result:', result);
    // console.log('Checkout go to pay', cart);
  }

  return <button className={styles.button_stripe} onClick={handleCheckout}><CreditCardIcon /> Payer en carte de crédit</button>
}

const PaypalButton = () => {

  const initialOptions = {
    clientId: 'Aeid7EDc0ak_n0KwMwjY4__IzTDESyj1hWWuc7szIERyoLsyFDDk5APZnvZUcT0OG_waLVPNMukpTnS-',
    // clientId: NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    currency: "EUR",
    intent: "capture",
  };


  return (
    <div className={styles.button_paypal}>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={{ layout: "horizontal", color: 'white', }} />
      </PayPalScriptProvider>
    </div>
  )
}

export { AddCartButton, AddOrDeleteItems, StripeButton, PaypalButton }