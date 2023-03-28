'use client';
import Image from 'next/image';
import Link from 'next/link';

import styles from '/public/styles/Article.module.scss';

import { HomepageCarousel } from '@/src/components/Carousel';

const Article = ({ elem, paragraph, index }) => {

  let urlArray = [];
  if (elem.id === 1) {
    urlArray = elem.image.split(',').map(url => url.trim());
  }

  return (
    <>
      <div className={index % 2 ? `${styles.articles__container__item__left}` : `${styles.articles__container__item}`}>
        <div className={styles.articles__container__item__description}>
          <h3>{elem.title}</h3>
          <div className={styles.articles__container__item__description__text}>
            {
              paragraph.map(para => <p key={para}>{para}</p>)
            }
          </div>
          <Link href={`/${elem.slug}`} >
            <button className={styles.button}>{elem.interaction}</button>
          </Link>
        </div>
        <div className={styles.articles__container__image}>
          {index === 0 ? <HomepageCarousel items={urlArray} /> : <Image src={elem.image} width={640} height={455} alt={`photo ${elem.title}`} />}
        </div>
      </div>
    </>
  )
}

export default Article;

