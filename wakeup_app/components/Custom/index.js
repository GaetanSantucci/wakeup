import styles from '/public/styles/Custom.module.scss';
import Link from 'next/link';

const Custom = () => {
  return (
    <div className={styles.custom__container}>
      <section className={styles.custom__container__details}>
        <div className={styles.custom__container__details__background}></div>
        <div className={styles.custom__container__details__card}>
          <h3>Personnalisez vos plateaux</h3>
          <p>Une envie particulière pour un jour spécial, ou tout simplement pour faire plaisir</p>
          <p>Offrez un plateau avec une attention, des fleurs, un petit mot</p>
          <p>Nous vous proposons des personnalisations de votre plateau orné d&apos; gros noeud avec un ruban en lin ou plus sophistiqué avec deux rubans en satin accompagnées d&apos;une rose rouge, symbole de passion dévorante ou blanche, symbole de l&apos;amour pur et simple
          </p>
          <p>Nos formules :</p>

          <p className={styles.custom__container__details__card__price}>Jolie ruban en lin avec noeud: <span>3,90 €</span></p>
          <p className={styles.custom__container__details__card__price}>Décoration florale avec eucalyptus : <span>5,90 €</span></p>
          <p className={styles.custom__container__details__card__price}>Rose, gypsophile et ruban : <span>14,90 €</span></p>

          <Link href={`/contact`} >
            <button className={styles.btn_custom}>Contact</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Custom