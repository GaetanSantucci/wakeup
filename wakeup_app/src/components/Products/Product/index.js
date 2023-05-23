import styles from '/public/styles/Product.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import Additionnal from '../Additional';
import Spinner from '@/src/components/Spinner';

import { AddCartButton } from '../../Button';

import { getProductById } from '/src/libs/getProductList';
import { Suspense } from 'react';


export default async function Product({ id, targetTime, currentTime }) {

  let plate = []
  const fetchProduct = await getProductById(id);
  plate.push(fetchProduct);



  return (
    <>
      <div className={styles.productId__container}>
        {
          plate.map(product => {
            const price = product.price.toString().replace('.', ',');
            const text = product.description.split('\\n')

            //todo mettre a jour la bdd pour retirer l'ip dans plates images
            return (
              <div className={styles.productId__container__card} key={product.id}>
                <div className={styles.productId__container__card__image}>
                  {/* <Image src=`https://wakeupclf.fr/images/${product.image}` alt={product.name} width={400} height={600} /> */}
                  <Image src='https://wakeupclf.fr/images/sunshine.webp' alt={product.name} width={400} height={600} />
                </div>
                <div className={styles.productId__container__card__details}>
                  <div className={styles.productId__container__card__details__effect}></div>
                  <h2 className={styles.productId__container__card__details__title}>{product.name}</h2>
                  <p className={styles.productId__container__card__details__subtitle}>{product.subtitle}</p>
                  <ul className={styles.productId__container__card__details__list}>
                    {
                      text.map(p => <li key={p}>- {p.replace('\\n', '')}</li>)
                    }
                  </ul>
                  <div className={styles.productId__container__card__details__information}>
                    <p>dimension en cm: {product.dimension}, photo non contractuelle</p>
                  </div>
                  <div className={styles.productId__container__card__details__order}>
                    <span className={styles.productId__container__card__details__order__price} >{price} €</span>
                    <div>
                      <AddCartButton items={{ id: product.id, name: product.name, price: product.price }} />
                    </div>
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