'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
export default function CheckoutSuccessPage() {
  const router = useRouter();

  const [counter, setCounter] = useState(3);
  console.log('counter:', counter);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(timer);
      router.push('/checkout');
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter, router]);

  return (
    <>
      <h1>Paiement non finalisée</h1>
      <p>
        Vous allez être redirigé vers l&apos;accueil dans {counter} secondes
      </p>
    </>
  );
}
