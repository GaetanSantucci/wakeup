import styles from './Personalisation.module.scss';
import Link from 'next/link';
import Image from 'next/image';

const Custom = () => {
  return (
    <div className={styles.container}>
      <section className={styles.container_details}>
        <div className={styles.container_details_background}>
          <Image src={'/images/personnalisation.webp'} alt='mini plateau avec décoration eucalyptus et noeud' width={500} height={700} />
        </div>
        <div className={styles.container_details_card}>
          <h3>Personnalisez vos plateaux</h3>
          <p>Une envie particulière pour un jour spécial, ou tout simplement pour faire plaisir</p>
          <p>Offrez un plateau avec une attention, des fleurs, un petit mot...</p>
          <p>Nous vous proposons différentes personnalisations pour vos plateaux mais n&apos;hésitez pas à nous faire part de vos demandes spéciales sur notre page contact</p>
          <p>Nos formules :</p>
          <p className={styles.container_details_card_price}>Jolie ruban en lin avec noeud: <span>3,90 €</span></p>
          <p className={styles.container_details_card_price}>Décoration florale avec eucalyptus : <span>6,90 €</span></p>

          <Link href={`/contact`} >
            <button className={styles.btn_custom}>Contact</button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Custom