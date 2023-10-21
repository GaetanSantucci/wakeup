'use client';
import styles from '/public/styles/Homepage.module.scss';
// Components
import { Blogs, Reviews, ScrollToTop, Spinner } from '@/src/components';

import Image from 'next/image';

import { Suspense } from 'react';


export default function Home() {

  return (
    <>
      <ScrollToTop />
      <div className={styles.homepage__header__container}>
        <div className={styles.homepage__header__container__image}>
          <Image
            src={'/images/presentation_dolce_homepage.webp'}
            alt='Plateau Brunch Dolce Vita avec presentation'
            width={1920}
            height={1440}
            priority
          />
        </div>
        <div className={styles.homepage__header__container__image_mobile}>
          <Image
            src={'/images/presentation_dolce_homepage_mobile.webp'}
            alt='Plateau Brunch Dolce Vita avec presentation'
            width={768}
            height={1300}
            priority
          />
        </div>
      </div>
      <section className={styles.homepage__header__container__presentation}>
        <p>
          L&apos;histoire de WAKE UP c&apos;est avant tout le plaisir de faire
          de bons et beaux petits déjeuners fait-maison ! Nous privilégions des
          produits frais, locaux et surtout nous prônons le fait-maison !
        </p>
        <p>
          Nous travaillons avec des artisans locaux et nous utilisons des
          produits frais et de qualité.
        </p>
        <p>
          Qui n&apos;a jamais rêvé de se faire livrer un bon petit déjeuner ou
          un brunch sans qu&apos;il n&apos;ait à sortir de chez lui et surtout
          sans bouger le petit doigt ?
        </p>
        <p>
          Découvrez notre sélection de plateaux gourmands et laissez-vous tenter
          !
        </p>
      </section>
      <Suspense fallback={<Spinner />}>
        <Blogs />
      </Suspense>
      <Suspense fallback={<Spinner />}>
        <Reviews />
      </Suspense>
    </>
  );
}
