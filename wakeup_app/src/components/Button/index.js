'use client';

import styles from './button.module.scss';

import { AddCartIcon } from '../ComponentSVG';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { removeItem, incrementQuantity, decrementQuantity } from '@/src/store/reducers/Cart';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { addToCart } from '@/src/store/reducers/Cart';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

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

  const handleCheckout = () => {
    console.log('Checkout go to pay', cart);
  }

  return <button type="button" onClick={handleCheckout}>Checkout</button>
}

export { AddCartButton, AddOrDeleteItems, StripeButton }