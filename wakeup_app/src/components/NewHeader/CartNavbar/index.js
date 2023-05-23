'use client';
import './cartNavbar.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModale } from '@/src/store/reducers/Settings';
import { selectTotalAmount } from '@/src/store/reducers/Cart';

const CartNavbar = () => {

  const dispatch = useDispatch();
  const { cartQty } = useSelector(selectTotalAmount)
  const { user, isLogged } = useSelector((state) => state.user)

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
        {cartQty && <div className='shop_item_cart_qty'>{cartQty}</div>}
      </div>
    </div>
  )

}

export default CartNavbar;