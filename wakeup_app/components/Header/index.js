import styles from '/public/styles/Header.module.scss';
import Navbar from './Navbar/Navbar';
import Logo from '../Logo';
import Link from 'next/link';
import logo from '/public/logo/logowakeuppng.png';
import Image from 'next/image';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const Header = () => {
  return (
    <header className={styles.header}>
      <Navbar />
      <Link className={styles.header__link} href='/'>
        <Image src={logo} alt='logo Wake up' style={{ width: '15%', height: 'auto', marginLeft: '1rem', maxWidth: '200px' }} />
      </Link>
    </header>
  )
}

export default Header; 