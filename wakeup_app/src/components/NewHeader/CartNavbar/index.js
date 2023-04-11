'use client';
import './cartNavbar.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModale } from '@/src/store/reducers/Settings';

const CartNavbar = () => {

  const dispatch = useDispatch();

  const openCart = useSelector((state) => state.settings.cartIsOpen)
  const { user, isLogged } = useSelector((state) => state.user)

  const handleOpenCart = (e) => {
    dispatch(toggleCartModale())
  }

  return (
    <div className='shop_item'>
      <Link href={isLogged ? `/user/profile/${user.id}` : '/login'}>
        <AccountCircleIcon className='shop_item_icon' />
      </Link>
      <ShoppingBagOutlinedIcon className='shop_item_icon' onClick={handleOpenCart} />
    </div>
  )

}

export default CartNavbar;