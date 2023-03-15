import styles from '/public/styles/Gift.module.scss';
import Link from 'next/link';

const Gift = () => {
  return (


    <div className={styles.gift__container}>
      <div className={styles.gift__container__details}>
        <div className={styles.gift__container__details__background} />
        <div className={styles.gift__container__details__card}>
          <h3 id='carte_cadeau'>carte cadeau</h3>
          <p>Surprenez vos proches et offrez leur un petit déjeuner gourmand livré à domicile ! </p>
          <p>Simple, rapide et facile ! </p>
          <p>Pour offrir cette carte cadeau, choisissez le montant souhaité et contactez nous par <Link href='mailto=contact@wakeupbox.fr'>mail</Link></p>
          <p>Il vous sera demandé les coordonnées de la personne (nom, prénom et adresse) à qui vous souhaitez offrir la carte cadeau.Une fois les modalités saisies et le règlement effectué. Nous réaliserons l&apos;e-carte cadeau et nous vous l&apos;enverrons par mail !</p>
          <p>Il ne vous restera plus qu&apos;à l&apos;imprimer si vous le souhaitez et l&apos;offrir</p>
          <ul>Cette carte est :
            <li>valable 6 mois, non échangeable, ni remboursable, fractionnable et cumulable entre elles si vous en possédez plusieurs.</li>
          </ul>
          <p>Le bénéficiaire de cette carte cadeau devra inscrire le numéro de celle-ci lors de la réservation dans l&apos;onglet code promo.</p>
          <p>Pour recevoir votre carte, nous vous proposons deux méthodes :</p>
          <ul>
            <li>- par mail sous forme d&apos;e-carte cadeau</li>
            <li>- par envoi postal dans une jolie enveloppe, prête à offrir (surcoût de 5,50€)</li>
          </ul>
          <Link href={`/contact`} >
            <button className={styles.btn_gift}>Contact</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Gift