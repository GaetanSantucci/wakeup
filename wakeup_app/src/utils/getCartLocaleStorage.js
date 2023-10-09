// 'use client';
// import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { getStorageCart } from '@/src/store/reducers/Cart';

// export const getCartFromLocaleStorage = () => {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const storedCart = JSON.parse(Cookie.('cart'));
//     if (storedCart) {
//       dispatch(getStorageCart(storedCart));
//     }
//   }, []);
// }
