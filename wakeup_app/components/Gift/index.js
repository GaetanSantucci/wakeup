import styles from '/public/styles/Gift.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import carteCadeauImage from '/public/images/carte_cadeau.webp';

const Gift = () => {
  return (

    <div className={styles.gift__container}>
      <div className={styles.gift__container__details}>
        <div className={styles.gift__container__details__background} >
          <Image src={carteCadeauImage} alt='photo carte cadeau avec enveloppe et cachet de cire' width={500} heigth={700} />
        </div>
        <div className={styles.gift__container__details__card}>
          <h3 id='carte_cadeau'>carte cadeau</h3>
          <p>Surprenez vos proches et offrez leur un petit déjeuner gourmand livré à domicile ! </p>
          <p>Simple, rapide et facile ! </p>
          <p>Pour offrir cette carte cadeau, choisissez le montant souhaité et contactez nous par <Link href='mailto=contact@wakeupbox.fr'>mail</Link>, indiquez nous les coordonnées de la personne (nom, prénom, adresse) à qui vous souhaitezl&apos;offrir</p>
          <ul>Cette carte est :
            <li>valable 6 mois, non échangeable, ni remboursable, fractionnable et cumulable entre elles si vous en possédez plusieurs.</li>
          </ul>
          <p>Pour recevoir votre carte, nous vous proposons deux méthodes :</p>
          <ul>
            <li>- par mail sous forme d&apos;e-carte cadeau</li>
            <li>- par envoi postal dans une jolie enveloppe, prête à offrir (surcoût de 5,50€)</li>
          </ul>
          <p>Le bénéficiaire n&apos;aura plus qu&apos;à saisir le numéro du bon lors de sa réservation dans l&apos;onglet code promo.</p>
          <Link href={`/contact`} >
            <button className={styles.btn_gift}>Contact</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Gift