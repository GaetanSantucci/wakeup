'use client';

import './button.scss';

import { AddCartIcon } from '../ComponentSVG';

import { addToCart } from '@/src/store/reducers/Cart';
import { useDispatch, useSelector } from 'react-redux';

const AddCartButton = ({ items }) => {

  // const cart = useSelector((state) => state.cart.cartItems)

  const { id, name, price } = items;

  const dispatch = useDispatch();

  const handleChangeCartItem = () => {
    dispatch(addToCart({ id, name, price }))
  }

  return (
    <>
      <button id='add-cart-button' onClick={handleChangeCartItem}><AddCartIcon /></button>
    </>
  )
}

export { AddCartButton }