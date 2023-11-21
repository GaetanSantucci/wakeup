'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Product.module.scss';

import { getProductsData } from '/src/libs/getProductList';
import { AddCartButton } from '../Button';
import Spinner from '../Spinner';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // setLoading(true);
        const productsData = await getProductsData();
        setProducts(productsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (products.length < 1) return <Spinner />;

  return (
    <div className={styles.container}>
      <h2 className={styles.container_title}>DES PLATEAUX GOURMANDS ET ÉLÉGANTS</h2>
      <p className={styles.container_text}>Nous vous proposons des plateaux gourmands, élégants et raffinés. Du petit-déjeuner, au brunch et même pour l&apos;apéritif, nous proposons une selection de plateaux avec des produits de qualité.</p>
      <p className={styles.container_text}>Nous avons à cœur de travailler avec des artisans locaux et nous concoctons également la plupart de nos produits car ici nous prônons le fait-maison !
      </p>
      <p className={styles.container_text}>Découvrez nos plateaux et laissez vous tenter !</p>
      <section className={styles.container_section}>
        { isLoading && <Spinner />}
        {
          products.map(product => {
            if (product.category === 'plateau') {
              const price = product.price.toString().replace('.', ','); // ? To replace . by , after fect price from database
              return (
                <div className={styles.container_section_card} key={product.id}>
                  {product.is_new ? <div className={styles.container_section_card_new}>Nouveau</div> : null}
                  <Link href={`/plateau/${product.slug}/${product.id}`} >
                    <div className={styles.container_section_card_image}>
                      <Image src={`/images/${product.image}.webp`} alt={product.name} width={300} height={430} priority/>
                    </div>
                  </Link>
                  <div className={styles.container_section_card_desc}>
                    <div className={styles.container_section_card_title}>
                      <h3>{product.name}</h3>
                      <p>{price} €</p>
                    </div>
                    <div className={styles.container_section_card_information}>
                      <Link href={`/plateau/${product.slug}/${product.id}`} className={styles.container_section_card_information_link}>En savoir plus</Link>
                      < AddCartButton items={{ id: product.id, name: product.name, price: product.price, img: product.image, category: product.category }} />
                    </div>
                  </div>
                </div>
              )
            }
          })
        }
      </section>
    </div>
  )
}
