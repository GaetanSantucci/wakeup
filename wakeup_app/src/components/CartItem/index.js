'use client';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

import { AddOrDeleteItems } from '../Button';
import { getTotal } from '@/src/libs/getCartTotal';
import Link from 'next/link';

const CartItem = () => {
  const cart = useSelector((state) => state.cart.cart)
  return (
    <>
      {
        cart.map(elem => {
          return (
            <div className='cart_modale_item' style={{ width: "100%" }} key={elem.name}>
              <div className='cart_modale_item_img'>
                <Image src={`/images/${elem.img}`} alt={elem.name} width={50} height={75} />
              </div>
              <div className='cart_modale_item_desc'>
                <p>{elem.name}</p>
                <AddOrDeleteItems cart={elem} />
              </div>
            </div>
          )
        })
      }
      {
        getTotal(cart).totalQuantity === 0 ? <p>Votre panier est vide, commencez vos achats <Link href='/plateau' style={{ textDecoration: 'underline' }}>ici</Link></p>
          :
          <>
            <p>Nombre d&apos;articles dans votre panier : {getTotal(cart).totalQuantity}</p>
            <p className=''>Montant du panier : {getTotal(cart).totalPrice.toFixed(2)}<span>€</span></p>
          </>
      }
    </>
  )
}

export { CartItem }