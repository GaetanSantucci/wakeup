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
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

const endpoint = process.env.NEXT_PUBLIC_ENDPOINT_LOCAL_TEST;

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
  console.log('cart danns le stripe button:', cart);

  const router = useRouter();

  const handleCheckout = async () => {
    const userId = 'testUser-54541'

    try {
      const response = await fetch(`${endpoint}/payment/stripe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart,
          userId
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          window.location.replace(data.url);
        }
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // axios.post(`${endpoint}/payment/stripe`, {
  //   cart,
  //   userId
  // }).then((res) => {
  //   if (res.data.url) {
  //     console.log('res.data.url:', res.data.url);
  //     window.location.replace(res.data.url)
  //   }
  // }).catch((err) => console.log(err.message))
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
  // }

  return <button className={styles.button_stripe} onClick={handleCheckout}><CreditCardIcon /><p>Carte bancaire</p></button>
}

const PayPalButtonComponent = () => {
  const cart = useSelector((state) => state.cart.cart)
  const router = useRouter();

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, // using .env in NextJs project 
    currency: "EUR",
    intent: "capture",
  };

  const style = { // style for paypal button
    height: 40,
    layout: "horizontal",
    color: 'gold',
    tagline: 'false'
  }
  const handleCreateOrder = async (data, actions) => {
    console.log('handleCreateOrder:');
    // Call your backend API to create the order
    const response = await fetch(`${endpoint}/payment/create-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    const order = await response.json();
    console.log('order:', order);
    return order.id;
  };
  const handleApproveOrder = useCallback(async (data, actions) => {

    console.log("Je passe dans le handleApproveOrder");
    // Call your backend API to capture the order
    const response = await fetch(`${endpoint}/payment/capture-paypal-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID: data.orderID, payerID: data.payerID }),
    });

    const order = await response.json();
    if (order.status === 'COMPLETED') {
      router.push('/checkout/success'); // redirect to page success if payment completed
    }
  });

  return (
    <div className={styles.button_paypal}>
      <PayPalScriptProvider options={initialOptions} >
        <PayPalButtons
          createOrder={handleCreateOrder}
          onApprove={handleApproveOrder}
          style={style}
        />
      </PayPalScriptProvider>
    </div>
  );
};
export { AddCartButton, AddOrDeleteItems, StripeButton, PayPalButtonComponent }