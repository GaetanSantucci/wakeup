'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetAllCartItems } from '@/src/store/reducers/Cart';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(resetAllCartItems());
  const [counter, setCounter] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      // ? set timer to redirect to homepage after payment success
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(timer);
      router.push('/');
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter, router]);

  return (
    <>
      <h1>Merci pour votre commande</h1>
      <p>
        Vous allez être redirigé vers l&apos;accueil dans {counter} secondes
      </p>
    </>
  );
}
