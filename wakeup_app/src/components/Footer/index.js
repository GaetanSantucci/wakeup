import styles from './Footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {

  return (
    <footer className={styles.container}>
      <div className={styles.container_item}>
        <div className={styles.container_social}>
          <p className={styles.container_social__text}> Suivez nous : </p>
          <div className={styles.container_social_logo}>
            <Link href='https://www.instagram.com/wakeup.clf/?hl=en' target='blank'><Image src={'/images/logo_instagram.png'} width={30} height={30} alt='logo instagram' /></Link>
            <Link href='https://www.facebook.com/people/wakeupclf/100069457776560/' target='blank'><Image src={'/images/logo_facebook.png'} width={30} height={30} alt='logo facebook' /></Link>
            <Link href='https://www.linkedin.com/in/wake-up-924779215/?originalSubdomain=fr' target='blank'><Image src={'/images/logo_linkedin.png'} width={30} height={30} alt='logo linkedin' /></Link>
          </div>
        </div>
        <ul className={styles.container_item_link}>
          <li><Link href='/livraison'>Livraison</Link></li>
          <li><Link href='/images/cgu_wakeup.pdf' target='blank'>CGU</Link> / <Link href='/images/cgv_wakeup.pdf' target='blank'>CGV</Link></li>
          {/* <li><Link href='/images/jeuconcourspaques.pdf' target='blank'>Conditions jeu concours</Link></li> */}
        </ul>
      </div>
      <p className={styles.container_creator}>© 2023 WAKE UP, tous droits réservés - Site réalisé par <Link href='https://virtualgs.fr' target='blank'>VirtualGS</Link></p>
    </footer>
  )
}

export default Footer;