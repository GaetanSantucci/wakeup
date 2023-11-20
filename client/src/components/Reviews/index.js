'use client';
import { use, useEffect, useState } from 'react';
import styles from './Review.module.scss';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary.js';
// import Spinner from '../Spinner';

export default function Reviews() {

  const [isReviews, setReviews] = useState([]);
  const [selectedElement, setSelectedElement] = useState();

  const handleButtonClick = (id) => {
    setSelectedElement(id);
  };

  function displayStars(rating) {
    const stars = Math.round(rating);
    let starDisplay = '';
    for (let i = 0; i < 5; i++) {
      if (i < stars) starDisplay += '⭐️';
    }
    return starDisplay;
  }

  useEffect(() => {
    // Check if we are running on the client-side
    if (typeof window !== 'undefined') {
      // Fetch data only on the client-side
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:3010/api/v2/reviews');
          if (response.ok) {
            const data = await response.json();
            setReviews(data);
          } else {
            throw new Error('Failed to fetch reviews');
          }
        } catch (error) {
          console.error(error);
        }
      }
      
      fetchData();
    }
  }, []);
  
  // throw new Error('Failed to fetch data');
  return (
    <>
      <h3>Nos avis clients</h3>
      <ErrorBoundary fallback={<div>Erreur lors du chargement des avis</div>}>
      <div className={styles.container}>
        {
          isReviews ?
            isReviews.map((r, i) => {
              return (
                <div key={r.author} className={styles.container_card}>
                  <div >{displayStars(r.star)}</div>
                  <div onClick={() => handleButtonClick(r.id)}>
                    <p className={selectedElement === r.id ? `${styles.more_line}` : null}><span style={{ fontSize: '2rem' }}>&#8223;</span>{r.description}</p>
                    {(r.description.length >= 95 && (selectedElement !== r.id)) ? <span style={{ color: '#000000', textDecoration: 'underline', fontSize: '0.8rem' }}>plus...</span> : null}
                  </div>
                  <div className={styles.container_card_info}>
                    <span >{r.author}</span><span >{r.date}</span><span> "{r.source}"</span>
                  </div>
                </div>
              )
            }) : null
        }
      </div>
      </ErrorBoundary>
    </>
  )

}