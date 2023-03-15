'use client';

import styles from '/public/styles/Maps.module.scss';

// method to fetch data
import { getArea } from '/libs/getDeliveryArea.js';
import { use, useState } from 'react';

import map from '/public/images/zone_livraison.png';
import Image from 'next/image';

const areaFetch = getArea();

export default function Maps() {

  const data = use(areaFetch);

  const [inputValue, setInputValue] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const [notInOurZone, setNotInOurZone] = useState();

  const handleChangeCity = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = data.filter(o =>
      o.city.toLowerCase().includes(inputValue.toLowerCase()));
    if (result.length !== 0) {
      setNotInOurZone(false);
      setInputValue('')
      setIsAvailable(result[0]);

      return result
    } else {
      setIsAvailable(null)
      setInputValue('')
      setNotInOurZone(true);
    }
  }

  return (
    <>
      <h2 className={styles.delivery__title}>Zone de livraison</h2>
      <div className={styles.delivery__container}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Entrez votre ville' value={inputValue} onChange={handleChangeCity} />
        </form>

        {
          isAvailable && <div className={`${styles.delivery__container__alert} ${styles.success}`}>
            <p>Vous êtes livrable sur {isAvailable.city} pour des frais de livraison s&apos;élevant à  {isAvailable.price} €</p>
          </div>
        }
        {notInOurZone &&
          <>
            <div className={`${styles.delivery__container__alert} ${styles.failed}`}>
              <p>Désolé, vous ne vous situez pas dans notre zone de livraison mais nous pouvons vous proposer un point de rendez-vous sur une des communes suivantes</p>
            </div>
            <select>
              {data.map((option, i) => (
                <option key={`${option.city} ${i}`} value={option.city}>{option.city}</option>
              ))}
            </select>
          </>
        }
        <div className={styles.delivery__container__image}>
          <Image src={map} alt='carte de la zone de livraison' style={{ width: '100%', height: '100%' }} />
        </div>
        <div className={styles.delivery__container__information}>
          <div className={styles.delivery__container__information__area}>
            <div style={{ backgroundColor: '#d9ffe2', padding: '0.5rem 1rem' }}>Livraison à 3,50 €</div>
            <ul>
              {
                data.map((option, i) => {
                  if (option.price === '3.50') return <li key={`${option.city} ${i}`} >{option.city}</li>
                })
              }
            </ul>
          </div>
          <div className={styles.delivery__container__information__area}>
            <div style={{ backgroundColor: '#fff9ce', padding: '0.5rem 1rem' }} >Livraison à 5,50 €</div>
            <ul>
              {
                data.map((option, i) => {
                  if (option.price === '5.50') return <li key={`${option.city} ${i}`} >{option.city}</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
