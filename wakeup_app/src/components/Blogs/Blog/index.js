'use client';
import Image from 'next/image';
import Link from 'next/link';

import styles from '../Blog.module.scss';

import { HomepageCarousel } from '@/src/components/Carousel';

const Blog = ({ elem, paragraph, index }) => {

  let urlArray = [];
  if (elem.id === 1) {
    urlArray = elem.image.split(',').map(url => url.trim());
  }

  return (
    <>
      <div className={index % 2 ? `${styles.container__item__left}` : `${styles.container__item}`}>
        <div className={styles.container__item__description}>
          <h3 className={styles.container__item__description__title}>{elem.title}</h3>
          <div className={styles.container__item__description__text}>
            {
              paragraph.map(para => <p key={para}>{para}</p>)
            }
          </div>
          <Link href={`/${elem.slug}`} >
            <button className={styles.button}>{elem.interaction}</button>
          </Link>
        </div>
        <div className={styles.container__image}>
          {index === 0 ? <HomepageCarousel items={urlArray} /> : <Image src={`/images/${elem.image}.webp`} width={640} height={455} alt={`photo ${elem.title}`} />}
        </div>
      </div>
    </>
  )
}

export default Blog;

