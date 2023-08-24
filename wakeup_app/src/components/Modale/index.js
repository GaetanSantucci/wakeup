'use client';
import './modale.scss';

import Link from 'next/link';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';

import { toggleCartModale, toggleLoginModale, toggleShowNavbar } from '@/src/store/reducers/Settings';

import { getTotal } from '@/src/libs/getCartTotal';
import { resetAllCartItems } from '@/src/store/reducers/Cart';
import { AddOrDeleteItems } from '../Button';


const CartModale = () => {

  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const { cart } = useSelector((state) => state.cart)
  const { loginModale } = useSelector((state) => state.settings)

  const closeModale = () => {
    dispatch(toggleCartModale())
    dispatch(toggleShowNavbar())
    if (loginModale) dispatch(toggleLoginModale())
  };
  const handleRemoveItem = () => {
    dispatch(resetAllCartItems());
    setTimeout(() => {
      closeModale();
    }, 400)

  }

  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3 className='cart_modale_title'>Votre panier </h3>
      {
        cart.map(elem => {
          return (
            <div className='cart_modale_item' key={elem.name}>
              <p>{elem.name}</p>
              <AddOrDeleteItems cart={elem} />
            </div>
          )
        })
      }
      <p className='cart_modale_price'>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span> €</span></p>
      <div className='cart_modale_controler'>
        <Link href='/checkout'>
          <button onClick={closeModale}>Validez</button>
        </Link>
        <p onClick={() => handleRemoveItem()}>Videz le panier</p>
      </div>
    </div>
  )
}



export { CartModale }