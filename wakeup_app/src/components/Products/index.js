import Image from 'next/image';
import Link from 'next/link';

import styles from '/public/styles/Product.module.scss';

import { getProductsData } from '/src/libs/getProductList';
import { AddCartButton } from '../Button';

export default async function Products() {

  // Retrieve products data asynchronously
  const products = await getProductsData();

  // Render the product section with the fetched data
  return (
    <>
      <h2 className={styles.product__title}>DES PLATEAUX GOURMANDS ET ÉLÉGANTS</h2>
      <p className={styles.product__text}>Nous vous proposons des plateaux gourmands, élégants et raffinés. Du petit-déjeuner, au brunch et même pour l&apos;apéritif, nous proposons une selection de plateaux avec des produits de qualité.</p>
      <p className={styles.product__text}>Nous avons à cœur de travailler avec des artisans locaux et nous concoctons également la plupart de nos produits car ici nous prônons le fait-maison !
      </p>
      <p className={styles.product__text}>Découvrez nos plateaux et laissez vous tenter !</p>
      <section className={styles.product__container}>
        {
          products.map(product => {
            const price = product.price.toString().replace('.', ',');
            return (
              <div className={styles.product__container__card} key={product.id}>
                {product.is_new ? <div className={styles.product__container__card__new}>Nouveau</div> : null}
                <Link href={`/plateau/${product.slug}/${product.id}`} >
                  <div className={styles.product__container__card__image}>
                    <Image src={`/images/${product.image}`} alt={product.name} width={300} height={430} />
                  </div>
                </Link>
                <div className={styles.product__container__card__desc}>
                  <div className={styles.product__container__card__title}>
                    <h3>{product.name}</h3>
                    <p>{price} €</p>
                  </div>
                  <div className={styles.product__container__card__information}>
                    <Link href={`/plateau/${product.slug}/${product.id}`} className={styles.product__container__card__information__link}>En savoir plus</Link>
                    < AddCartButton items={{ id: product.id, name: product.name, price: product.price, img: product.image }} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    </>
  )
}
