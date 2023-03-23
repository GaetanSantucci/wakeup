'use client';
import './cartNavbar.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModale } from '@/store/reducers/settings';

const CartNavbar = () => {
  const openCart = useSelector((state) => state.settings.cartIsOpen)
  const dispatch = useDispatch();

  const handleOpenCart = (e) => {
    dispatch(toggleCartModale())
    console.log('openCart: ', openCart);
  }

  return (
    <div className='shop_item'>
      <Link href='/contact'>
        <Person2OutlinedIcon className='shop_item_icon' />
      </Link>
      <ShoppingBagOutlinedIcon className='shop_item_icon' onClick={handleOpenCart} />
    </div>
  )

}

export default CartNavbar;