'use client';

import styles from './button.module.scss';

import { AddCartIcon } from '../ComponentSVG';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

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

export { AddCartButton }