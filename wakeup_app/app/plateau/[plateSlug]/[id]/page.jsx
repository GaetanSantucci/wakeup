import { Product, ScrollToTop, Spinner } from '@/components';
import { Suspense } from 'react';

export default async function Post({ params }) {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}/>
      <Product id={+params.id || 1}/>
      <Suspense />
    </>
  );
}

