import styles from '../Product.module.scss';

import Image from 'next/image';

import Additionnal from '../Additional';
import Spinner from '@/src/components/Spinner';

import { AddCartButton } from '../../Button';

import { getProductById } from '/src/libs/getProductList';
import { Suspense } from 'react';


export default async function Product({ id }) {

  let plate = []
  const fetchProduct = await getProductById(id);
  plate.push(fetchProduct);

  return (
    <>
      <div className={styles.productId_container}>
        <div className={styles.productId_container_effect}></div>
        <div className={styles.productId_container_effect_border}></div>
        {
          plate.map(product => {
            const price = product.price.toString().replace('.', ',');
            const text = product.description.split('\\n')
            return (
              <div className={styles.productId_container_card} key={product.id}>
                <div className={styles.productId_container_card_image}>
                  <Image src={`/images/${product.image}.webp`} alt={product.name} width={400} height={600} />
                </div>
                <div className={styles.productId_container_card_details}>
                  {/* <div className={styles.productId_container_card_details_effect}></div> */}
                  <h2 className={styles.productId_container_card_details_title}>{product.name} </h2>
                  <p className={styles.productId_container_card_details_subtitle}>{product.subtitle}</p>
                  <ul className={styles.productId_container_card_details_list}>
                    {
                      text.map(p => <li key={p}>- {p.replace('\\n', '')}</li>)
                    }
                  </ul>
                  <div className={styles.productId_container_card_details_information}>
                    <p>dimension en cm: {product.dimension}, photo non contractuelle</p>
                  </div>
                  <div className={styles.productId_container_card_details_order}>
                    {/* <span className={styles.productId_container_card_details_order_price} >{price} €</span> */}
                    <div>
                      <AddCartButton items={{ id: product.id, name: product.name, price: product.price, img: product.image }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <Suspense fallback={<Spinner />}>
        {/* <Additionnal /> */}
      </Suspense>
    </>
  );
}