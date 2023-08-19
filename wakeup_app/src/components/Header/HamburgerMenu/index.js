import styles from './mobileNavbar.module.scss';
import Navbar from '../Navbar';
import CartNavbar from '../CartNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShowNavbar, toggleLoginModale } from '@/src/store/reducers/Settings';

const MobileNavbar = () => {

  const dispatch = useDispatch();
  const { mobileNavbar, loginModale } = useSelector((state) => state.settings)
  const handleActiveMenu = () => {
    dispatch(toggleShowNavbar());
    if (loginModale) dispatch(toggleLoginModale())
  }

  return (
    <>
      <HamburgerMenu active={mobileNavbar} toggleMenu={handleActiveMenu} />
      <div className={mobileNavbar ? `${styles.container} ${styles.active_navbar}` : `${styles.container}`}  >
        {/* <div> */}
        <CartNavbar className={mobileNavbar ? `${styles.menu_open}` : null} toggleMenu={handleActiveMenu} />
        <Navbar toggleMenu={handleActiveMenu} />
        {/* </div> */}
      </div>
    </>
  )
}

const HamburgerMenu = ({ toggleMenu }) => {

  const mobileNavbar = useSelector((state) => state.settings.mobileNavbar)

  return (
    <div className={mobileNavbar ? `${styles.mobile_menu} ${styles.open}` : `${styles.mobile_menu}`}
      onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}



export { HamburgerMenu, MobileNavbar };