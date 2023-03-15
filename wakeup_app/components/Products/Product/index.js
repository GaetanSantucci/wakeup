import styles from '/public/styles/Product.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import Additionnal from '../Additional';

import { getProductById } from '/libs/getProductList';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';

export default async function Product({ id }) {

  let plate = []
  const fetchProduct = await getProductById(id);
  plate.push(fetchProduct);


  return (
    <>
      <div className={styles.productId__container}>
        {
          plate.map(elem => {
            const price = elem.price.toString().replace('.', ',');
            const text = elem.description.split('\\n')

            return (
              <div className={styles.productId__container__card} key={elem.name}>
                <div className={styles.productId__container__card__image}>
                  <Image src={elem.image} alt={elem.name} width={400} height={600} />
                </div>
                <div className={styles.productId__container__card__details}>
                  <div className={styles.productId__container__card__details__effect}></div>
                  <h2 className={styles.productId__container__card__details__title}>{elem.name}</h2>
                  <p className={styles.productId__container__card__details__subtitle}>{elem.subtitle}</p>
                  <ul className={styles.productId__container__card__details__list}>
                    {
                      text.map(p => <li key={p}>- {p.replace('\\n', '')}</li>)
                    }
                  </ul>
                  <div className={styles.productId__container__card__details__information}>
                    <p>dimension en cm: {elem.dimension}, photo non contractuelle</p>
                  </div>
                  <div className={styles.productId__container__card__details__order}>
                    <span className={styles.productId__container__card__details__order__price} >{price} €</span>
                    <Link href='https://wakeupclf.simplybook.it/v2/#book' target='blank'><button className={styles.button}>Réserver</button></Link>
                  </div>
                </div>
              </div>
            )
            // }
          })
        }
      </div>
      <Suspense fallback={<Spinner />}>
        <Additionnal products={fetchProduct.addon_sales} />
      </Suspense>
    </>
  );
}