'use client';

import './button.scss';

import { AddCartIcon } from '../ComponentSVG';

import { toggleOpenCalendar, addToCart } from '@/src/store/reducers/Cart';
import { useDispatch } from 'react-redux';

const AddCartButton = ({ items }) => {
  const { id, name, price } = items;
  console.log('items:', items);
  const dispatch = useDispatch();

  const handleToggleOpenCalendar = (item) => {
    dispatch(toggleOpenCalendar())
    dispatch(addToCart({ id, name, price }))
  }

  return (
    <>
      <button id='add-cart-button' onClick={handleToggleOpenCalendar}><AddCartIcon /></button>
    </>
  )
}

export { AddCartButton }