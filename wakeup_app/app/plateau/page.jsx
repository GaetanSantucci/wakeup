import { InstaLink, Products, ScrollToTop, Spinner } from '@/components';
import { Suspense } from 'react';

export default function plates() {
  return (
    <>
    <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Products />
      </Suspense>
    </>
  )
}

