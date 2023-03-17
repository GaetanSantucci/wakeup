import styles from '/public/styles/Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

import logoInstagram from 'public/images/logo_instagram.png';
import logoFacebook from 'public/images/logo_facebook.png';
import logoLinkedIn from 'public/images/logo_linkedin.png';


const Footer = () => {

  return (
    <footer className={styles.footer__container}>
      <div className={styles.footer__container__item}>
        <div className={styles.footer__container__social}>
          <p className={styles.footer__container__social__text}> Suivez nous : </p>
          <div className={styles.footer__container__social__logo}>
            <Link href='https://www.instagram.com/wakeup.clf/?hl=en' target='blank'><Image src={logoInstagram} width={50} height={50} alt='logo instagram' /></Link>
            <Link href='https://www.instagram.com/wakeup.clf/?hl=en' target='blank'><Image src={logoFacebook} width={50} height={50} alt='logo facebook' /></Link>
            <Link href='https://www.linkedin.com/in/wake-up-924779215/?originalSubdomain=fr' target='blank'><Image src={logoLinkedIn} width={50} height={50} alt='logo linkedin' /></Link>
          </div>
        </div>
        <ul className={styles.footer__container__item__link}>
          <li><Link href='/livraison'>Livraison</Link></li>
          <li><Link href='/images/cgu_wakeup.pdf' target='blank'>CGU</Link> / <Link href='/images/cgv_wakeup.pdf' target='blank'>CGV</Link></li>
          <li><Link href='/images/jeuconcourspaques.pdf' target='blank'>Conditions jeu concours</Link></li>
        </ul>
      </div>
      <p>© 2023 WAKE UP, tous droits réservés</p>
      <div className={styles.footer__container__creator}>Site réalisé par <Link href='mailto:contact@virtualgs.fr' target='blank'>VirtualGS</Link></div>
    </footer>
  )
}

export default Footer;