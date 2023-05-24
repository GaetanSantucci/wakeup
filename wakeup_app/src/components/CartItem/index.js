'use client';

import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';

import { selectTotalAmount, addItems, deleteItems } from '@/src/store/reducers/Cart';

const CartItem = () => {

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => Object.values(state.cart.cartItems))
  const { newTotal } = useSelector(selectTotalAmount)

  const handleChangeIncreaseQty = (qty, id) => {
    dispatch(addItems({ id, quantity: qty + 1 }));
  };

  const handleChangeDecreaseQty = (qty, id) => {
    if (qty >= 0) {
      dispatch(deleteItems({ id, quantity: qty - 1 }));
    }
  };
  console.log('cartItems:', cartItems);
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
                  <span onClick={() => { handleChangeDecreaseQty(elem.quantity, elem.id) }}>-</span>
                  {elem.quantity}
                  <span onClick={() => { handleChangeIncreaseQty(elem.quantity, elem.id) }}>+</span>
                </div>
              </div>
            </div>
          )
        })
      }
      <p>Montant du panier : {newTotal} <span>€</span></p>
    </>
  )
}

export { CartItem }