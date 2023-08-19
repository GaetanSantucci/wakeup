// 'use client';
import styles from './Additionnal.module.scss';

import Image from 'next/image';
// import { useMedia } from 'react-use';

import { AddonCarousel } from '@/src/components/Carousel';
import { AddCartButton } from '../../Button';
import { getProductsData } from '/src/libs/getProductList';



export default async function Additionnal() {

  const products = await getProductsData();
  // const supplement = products.filter(elem => elem.category === 'boisson' || elem.category === 'decoration');

  // const isSmallScreen = useMedia('(max-width: 768px)', false);

  return (

    <div className={styles.container}>
      <AddonCarousel products={products} />
      <div className={styles.container_cards}>
        {/* isSmallScreen ?  : */ products.map(elem => {
          if (elem.category === 'boisson' || elem.category === 'decoration') {
            const price = elem.price.toString().replace('.', ',');
            return (
              <div key={elem.name} className={styles.container_cards_item}>
                <div className={styles.container_cards_item_image}>
                  <Image src={`/images/${elem.image}.webp`} width={250} height={230} alt={elem.name} />
                </div>
                <div className={styles.container_cards_item_details}>
                  <h3>{elem.name}</h3>
                  <div>
                    <p>{elem.description}</p>
                    <p><span>{price} €</span></p>
                  </div>
                  <AddCartButton items={{ id: elem.id, name: elem.name, price: elem.price, img: elem.image }} key={elem.price} />
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}