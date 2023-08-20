import { Suspense } from 'react';
import { Additionnal, ScrollToTop, Spinner } from '@/src/components';

export default function plates() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <h2 style={{ marginTop: '4rem', marginBottom: '2rem' }}>
          Pour accompagner vos brunchs
        </h2>
        <p>
          Retrouvez nos accompagnements pour parfaire votre livraison, envie de
          fraicheur, de chaleur, d'une décoration pour embellir votre plateau{' '}
        </p>
        <Additionnal />
      </Suspense>
    </>
  );
}
