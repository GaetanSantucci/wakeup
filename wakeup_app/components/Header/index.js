import styles from '/public/styles/Header.module.scss';
import Navbar from './Navbar/Navbar';
import Logo from '../Logo';
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} href='/'>
        <Logo />
      </Link>
      <Navbar />
    </header>
  )
}

export default Header; 