'use client';
import { use, useState } from 'react';
import styles from './Review.module.scss';

//method to fetch data reviews
import { getReviewData } from '/src/libs/getReviewList.js';

const reviewsFetch = getReviewData()


export default function Reviews() {

  const reviews = use(reviewsFetch)

  const [selectedElement, setSelectedElement] = useState();

  const handleButtonClick = (id) => {
    setSelectedElement(id);
  }

  function displayStars(rating) {
    const stars = Math.round(rating);
    let starDisplay = '';
    for (let i = 0; i < 5; i++) {
      if (i < stars) starDisplay += '⭐️';
    }
    return starDisplay;
  }



  return (
    <>
      <h3>Nos avis clients</h3>
      <div className={styles.container}>
        {
          reviews.map((r, i) => {
            return (
              <div key={r.author} suppressHydrationWarning={true} className={styles.container_card}>
                <div suppressHydrationWarning={true} >{displayStars(r.star)}</div>
                <div suppressHydrationWarning={true} onClick={() => handleButtonClick(r.id)}>
                  <p suppressHydrationWarning={true} className={selectedElement === r.id ? `${styles.more_line}` : null}><span suppressHydrationWarning={true} style={{ fontSize: '2rem' }}>&#8223;</span>{r.description}</p>
                  {(r.description.length >= 95 && (selectedElement !== r.id)) ? <span style={{ color: '#000000', textDecoration: 'underline', fontSize: '0.8rem' }}>plus...</span> : null}
                </div>
                <div className={styles.container_card_info}>
                  <span suppressHydrationWarning={true} >{r.author}</span><span suppressHydrationWarning={true} >{r.date}</span>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}