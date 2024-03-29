'use client';
import styles from './Maps.module.scss';

// method to fetch data
import { getArea } from '/src/libs/getDeliveryArea.js';
import { use, useState } from 'react';

import Spinner from '../Spinner';

const areaFetch = getArea();

export default function Maps() {

  const data = use(areaFetch);
  if(!data) return <Spinner />;

  const [inputCityValue, setinputCityValue] = useState('');
  const [isAvailable, setIsAvailable] = useState();
  const [notInOurZone, setNotInOurZone] = useState();

  const handleChangeCity = (e) => {
    setinputCityValue(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = data.filter(o =>
      o.city.toLowerCase().includes(inputCityValue.toLowerCase()));
    if (result.length !== 0) {
      setNotInOurZone(false);
      setinputCityValue('')
      setIsAvailable(result[0]);

      return result
    } else {
      setIsAvailable(null)
      setinputCityValue('')
      setNotInOurZone(true);
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.container_title} data-testid="title">Zone de livraison</h2>
      <div className={styles.container_delivery}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Entrez votre ville' value={inputCityValue} onChange={handleChangeCity} />
        </form>

        {
          isAvailable && <div className={`${styles.container_delivery_alert} ${styles.success}`}>
            <p>Vous êtes livrable sur {isAvailable.name} pour des frais de livraison s&apos;élevant à  {isAvailable.price} €</p>
          </div>
        }
        {notInOurZone &&
          <>
            <div className={`${styles.container_delivery_alert} ${styles.failed}`}>
              <p>Désolé, vous ne vous situez pas dans notre zone de livraison mais nous pouvons vous proposer un point de rendez-vous sur une des communes suivantes</p>
            </div>
            <select>
              {data.map((option, i) => (
                <option key={`${option.city} ${i}`} value={option.city}>{option.city}</option>
              ))}
            </select>
          </>
        }
        <div className={styles.container_delivery_image}>
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1nuWuEZaNSH18DzwGsZPGH4pjSflwA7U&ehbc=2E312F&noprof=1" width="100%" height="600"></iframe>
        </div>
      </div>
    </div>
  )
}
