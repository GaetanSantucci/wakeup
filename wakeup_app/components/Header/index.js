import styles from '/public/styles/Header.module.scss';
import Navbar from './Navbar/Navbar';
import Logo from '../Logo';
import Link from 'next/link';
import logo from '/public/logo/logowakeuppng.png';
import Image from 'next/image';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} href='/'>
        {/* <Logo /> */}
        <Image src={logo} alt='logo Wake up' style={{ width: '15%', height: 'auto', marginLeft: '1rem' }} />
      </Link>
      <Navbar />
    </header>
  )
}

export default Header; 