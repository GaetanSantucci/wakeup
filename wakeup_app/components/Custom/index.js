import styles from '/public/styles/Custom.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import personnalisationImage from '/public/images/personnalisation.webp';

const Custom = () => {
  return (
    <div className={styles.custom__container}>
      <section className={styles.custom__container__details}>
        <div className={styles.custom__container__details__background}>
          <Image src={personnalisationImage} alt='mini plateau avec décoration eucalyptus et noeud' width={500} heigth={700} />
        </div>
        <div className={styles.custom__container__details__card}>
          <h3>Personnalisez vos plateaux</h3>
          <p>Une envie particulière pour un jour spécial, ou tout simplement pour faire plaisir</p>
          <p>Offrez un plateau avec une attention, des fleurs, un petit mot...</p>
          <p>Nous vous proposons différentes personnalisations pour vos plateaux mais n&apos;hésitez pas à nous faire part de vos demandes spéciales sur notre page contact</p>
          <p>Nos formules :</p>
          <p className={styles.custom__container__details__card__price}>Jolie ruban en lin avec noeud: <span>3,90 €</span></p>
          <p className={styles.custom__container__details__card__price}>Décoration florale avec eucalyptus : <span>6,90 €</span></p>

          <Link href={`/contact`} >
            <button className={styles.btn_custom}>Contact</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Custom