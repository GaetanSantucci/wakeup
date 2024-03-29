// 'use client';
import styles from './Additionnal.module.scss';

import Image from 'next/image';

import Spinner from '@/src/components/Spinner';
import { AddCartButton } from '../../Button';
import { getProductsData } from '/src/libs/getProductList';

export default async function Additionnal() {

  const products = await getProductsData();
  if(!products) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.container_title} >
        Pour accompagner vos brunchs
      </h2>
      <p>
        Retrouvez nos accompagnements pour parfaire votre livraison, envie de
        fraicheur, de chaleur, d'une décoration pour embellir votre plateau
      </p>
        <p>Ces produits ne peuvent être vendus sans commande d&apos;un plateau</p>
      <div className={styles.container_cards}>
        { products.map(elem => {
          if (elem.category === 'boisson' || elem.category === 'decoration') {
            const price = elem.price.toString().replace('.', ',');
            return (
              <div key={elem.name} className={styles.container_cards_item}>
                <div className={styles.container_cards_item_image}>
                  <Image src={`/images/${elem.image}.webp`} width={250} height={230} alt={elem.name} priority/>
                </div>
                <div className={styles.container_cards_item_details}>
                  <h3>{elem.name}</h3>
                  <div>
                    <p>{elem.description}</p>
                    <p><span>{price} €</span></p>
                  </div>
                  <AddCartButton items={{ id: elem.id, name: elem.name, price: elem.price, img: elem.image, category: elem.category}} key={elem.price} />
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}