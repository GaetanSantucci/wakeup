'use client';
import './cartNavbar.scss';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useDispatch, useSelector } from 'react-redux';
import { toggleCartModale, toggleLoginModale } from '@/src/store/reducers/Settings';
// import { useMediaQuery } from '@/src/hook/useMediaQuery';
import { useRouter } from 'next/navigation';

import { UserLogin } from '../../Form';

const CartNavbar = ({ toggleMenu }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  // const isBreakpoint = useMediaQuery(1024) // Custom hook to check screen size, return boolean

  const { user, isLogged } = useSelector((state) => state.user)
  const cart = useSelector((state) => state.cart.cart)

  const isLoginModale = useSelector((state) => state.settings.loginModale)


  const getTotalQuantity = () => { // check qty items in cart to set icon on shopping bag
    let total = 0;
    cart.forEach(item => {
      total += item.quantity
    })
    return total
  }

  const handleOpenCart = () => {
    dispatch(toggleCartModale())
  }

  const closeMenu = () => {
    // console.log('isBreakpoint:', isBreakpoint);
    // if (isBreakpoint) { 
    //   setTimeout(() => toggleMenu(), 400)
    // }
    if (isLogged) {
      router.push(`/user/profile/${user.id}`)
    } else {
      dispatch(toggleLoginModale())
    }

  }

  return (
    <div className='shop_item'>
      {/* <Link href={isLogged ? `/user/profile/${user.id}` : '/login'} onClick={closeMenu}> */}
      <AccountCircleIcon className='shop_item_icon' onClick={closeMenu} />
      {/* </Link> */}
      <div className='shop_item_cart'>
        <ShoppingBagOutlinedIcon className='shop_item_cart_icon' onClick={handleOpenCart} />
        {
          getTotalQuantity() !== 0 ? <div className='shop_item_cart_qty'>{getTotalQuantity()}</div> : null // display icon for items qty
        }

      </div>
      {
        isLoginModale && <UserLogin />
      }
    </div>
  )

}

export default CartNavbar;