'use client';
import styles from '/public/styles/Additionnal.module.scss';

import Image from 'next/image';
import { useMedia } from 'react-use';

import { AddonCarousel } from '@/src/components/Carousel';
import { AddCartButton } from '../../Button';

const Additionnal = ({ products }) => {
  const isSmallScreen = useMedia('(max-width: 768px)', false);

  return (
    <div className={styles.additionnal__container}>


      <div className={styles.additionnal__container__cards}>
        {isSmallScreen ? <AddonCarousel products={products} /> : products.map(elem => {
          const price = elem.price.toString().replace('.', ',');
          return (
            <div key={elem.name} className={styles.additionnal__container__cards__item}>
              <div className={styles.additionnal__container__cards__item__image}>
                <Image src={elem.image} width={250} height={230} alt={elem.name} />
              </div>
              <div className={styles.additionnal__container__cards__item__details}>
                <h3>{elem.name}</h3>
                <div>
                  <p>{elem.description}</p>
                  <p><span>{price} €</span></p>
                </div>
              </div>
            </div>

          )
        })}
      </div>
      <div className={styles.additionnal__container__options}>
        <h3>Personnalisez vos plateaux</h3>

        <div className={styles.additionnal__container__options__input}>
          <div className={styles.additionnal__container__options__input__title}>
            <label htmlFor='flower'>Formule ruban lin</label><span>3,90 €</span>
            {/* <input type='checkbox' /> */}
          </div>
          <p>Un joli noeud en lin, parfait pour une occasion spéciale</p>
        </div>
        <div className={styles.additionnal__container__options__input}>
          <div className={styles.additionnal__container__options__input__title}>
            <label htmlFor='flower'>Formule décoration florale</label><span>6,90 €</span>
            {/* <input type='checkbox' /> */}
          </div>
          <p>Sobre et raffiné, l&apos;eucalyptus donnera un effet naturel à votre plateau</p>
        </div>
      </div>
    </div>
  )
}

export default Additionnal;