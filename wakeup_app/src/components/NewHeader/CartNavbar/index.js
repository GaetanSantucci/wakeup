'use client';
import './cartNavbar.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModale } from '@/src/store/reducers/Settings';
import { getStorageCart } from '@/src/store/reducers/Cart';
import { useEffect } from 'react';

const CartNavbar = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedCart = JSON.parse(localStorage?.getItem('cart'));
  //   console.log('storedCart:', storedCart);
  //   if (storedCart) {
  //     dispatch(getStorageCart(storedCart));
  //   }
  // }, [])

  const { user, isLogged } = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart.cart)

  const getTotalQuantity = () => { // check qty items in cart to set icon on shopping bag
    let total = 0;
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }

  const handleOpenCart = (e) => {
    dispatch(toggleCartModale())
  }

  return (
    <div className='shop_item'>
      <Link href={isLogged ? `/user/profile/${user.id}` : '/login'}>
        <AccountCircleIcon className='shop_item_icon' />
      </Link>
      <div className='shop_item_cart'>
        <ShoppingBagOutlinedIcon className='shop_item_cart_icon' onClick={handleOpenCart} />
        {
          getTotalQuantity() !== 0 ? <div className='shop_item_cart_qty'>{getTotalQuantity()}</div> : null // display icon for items qty
        }

      </div>
    </div>
  )

}

export default CartNavbar;