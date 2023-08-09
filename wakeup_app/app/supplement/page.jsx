import { Suspense } from 'react';
import { Additionnal, ScrollToTop, Spinner } from '@/src/components';

export default function plates() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <p>Bienvenu sur la page des supplements</p>
        <Additionnal />
      </Suspense>
    </>
  );
}
