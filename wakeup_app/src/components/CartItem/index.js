'use client';

import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import { selectTotalAmount, addItems, deleteItems, incrementQuantity, decrementQuantity } from '@/src/store/reducers/Cart';

const CartItem = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cart)

  const handleChangeIncreaseQty = (id) => {
    dispatch(incrementQuantity())
  };

  const handleChangeDecreaseQty = (id) => {
    dispatch(decrementQuantity())
  };
  return (
    <>
      {
        cartItems.map(elem => {
          return (
            <div className='cart_modale_item' style={{ width: "100%" }} key={elem.name}>
              <div className='cart_modale_item_img'>
                <Image src={`http://localhost:3000/images/${elem.img}`} alt={elem.name} width={50} height={75} />
              </div>
              <div className='cart_modale_item_desc'>
                <p>{elem.name}</p>
                <div className='cart_modale_item_quantity'>
                  <span onClick={() => { handleChangeDecreaseQty(elem.id) }}>-</span>
                  {elem.quantity}
                  <span onClick={() => { handleChangeIncreaseQty(elem.id) }}>+</span>
                </div>
              </div>
            </div>
          )
        })
      }
      {/* <p>Montant du panier : {newTotal} <span>€</span></p> */}
    </>
  )
}

export { CartItem }