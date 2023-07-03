import Image from 'next/image';
import Link from 'next/link';

import styles from './Product.module.scss';

import { getProductsData } from '/src/libs/getProductList';
import { AddCartButton } from '../Button';

export default async function Products() {

  // ? Retrieve products data asynchronously
  const products = await getProductsData();

  // ? Render the product section with the fetched data
  return (
    <div className={styles.container}>
      <h2 className={styles.container_title}>DES PLATEAUX GOURMANDS ET ÉLÉGANTS</h2>
      <p className={styles.container_text}>Nous vous proposons des plateaux gourmands, élégants et raffinés. Du petit-déjeuner, au brunch et même pour l&apos;apéritif, nous proposons une selection de plateaux avec des produits de qualité.</p>
      <p className={styles.container_text}>Nous avons à cœur de travailler avec des artisans locaux et nous concoctons également la plupart de nos produits car ici nous prônons le fait-maison !
      </p>
      <p className={styles.container_text}>Découvrez nos plateaux et laissez vous tenter !</p>
      <section className={styles.container_section}>
        {
          products.map(product => {
            const price = product.price.toString().replace('.', ','); // ? To replace . by , after fect price from database
            return (
              <div className={styles.container_section_card} key={product.id}>
                {product.is_new ? <div className={styles.container_section_card_new}>Nouveau</div> : null}
                <Link href={`/plateau/${product.slug}/${product.id}`} >
                  <div className={styles.container_section_card_image}>
                    <Image src={`/images/${product.image}`} alt={product.name} width={300} height={430} />
                  </div>
                </Link>
                <div className={styles.container_section_card_desc}>
                  <div className={styles.container_section_card_title}>
                    <h3>{product.name}</h3>
                    <p>{price} €</p>
                  </div>
                  <div className={styles.container_section_card_information}>
                    <Link href={`/plateau/${product.slug}/${product.id}`} className={styles.container_section_card_information_link}>En savoir plus</Link>
                    < AddCartButton items={{ id: product.id, name: product.name, price: product.price, img: product.image }} />
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    </div>
  )
}
