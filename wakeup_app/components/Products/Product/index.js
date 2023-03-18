import styles from '/public/styles/Product.module.scss';

import Image from 'next/image';
import Link from 'next/link';

import Additionnal from '../Additional';

import { getProductById } from '/libs/getProductList';
import { Suspense } from 'react';
import Spinner from '@/components/Spinner';


export default async function Product({ id, targetTime, currentTime }) {

  let plate = []
  const fetchProduct = await getProductById(id);
  plate.push(fetchProduct);



  return (
    <>
      <div className={styles.productId__container}>
        {plate.length > 0 && plate[0].slug === 'paques' && (
          <>
            <div className={styles.productId__container__easter}>
              <p>Laissez vous tenter par notre nouvelle création aux notes fruitées et chocolatées.</p>
              <p>Ce plateau sera parfait pour les petits et grands enfants, idéal pour passer un joli moment en famille ou entre amis.</p>
              <p>Il se compose d&apos;un oeuf suprise à casser ainsi qu&apos;un assortiment de chocolats signé <Link href='https://www.arthaud-chocolatier.fr/' target='blank'>Mathieu Arthaud.</Link></p>
              <p>Vous trouverez aussi nos produits phares fait-maison ainsi que nos nouvelles mini gaufres liégeoises qui se marieront parfaitement avec le chocolat. Vous pouvez accompagner ce plateau de thé Dammann &ldquo; Easter Tea &rdquo; aux saveurs vanille et chocolat.</p>
            </div>
            <div className={styles.productId__container__information}>
              <h3>&laquo; GOLDEN EGG &raquo;</h3>
              <p>Pour participer au jeu concours:</p>
              <p>Pour chaque plateau de Pâques livré entre le 1er et le 30 avril</p>
              <p style={{ fontSize: '1.4rem', fontWeight: '500' }}>=</p>
              <p>Recevez un jeton numéroté !</p>
              <p>Ce jeton vous inscrit directement au tirage au sort qui sera effectué le 30 avril pour remporter la pépite d&apos;or de 3,17 grammes d&apos;une valeur de 425€.</p>
              <p className={styles.productId__container__information__reservation}>Pré-reservation par mail du 20 au 26 mars en cliquant <Link href='/contact' >ici.</Link></p>
              <Link href='/images/jeuconcourspaques.pdf' target='blank'><code>Voir les conditions générales du jeu concours</code></Link>
            </div>
          </>
        )}
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