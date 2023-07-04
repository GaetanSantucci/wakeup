// 'use client';
import styles from './mobileNavbar.module.scss';
import Navbar from '../Navbar';
import CartNavbar from '../CartNavbar';

import { useDispatch, useSelector } from 'react-redux';
import { toggleShowNavbar } from '@/src/store/reducers/Settings';





const HamburgerMenu = ({ toggleMenu }) => {

  const isMobileOpen = useSelector((state) => state.settings.mobileNavbar)


  return (
    <div className={isMobileOpen ? `${styles.mobile_menu} ${styles.open}` : `${styles.mobile_menu}`}
      onClick={toggleMenu}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

const MobileNavbar = () => {

  const dispatch = useDispatch();
  const isMobileOpen = useSelector((state) => state.settings.mobileNavbar)
  const handleActiveMenu = () => {
    dispatch(toggleShowNavbar());
  }

  return (
    <>
      <HamburgerMenu active={isMobileOpen} toggleMenu={handleActiveMenu} />
      <div className={isMobileOpen ? `${styles.container} ${styles.active_navbar}` : `${styles.container}`}  >
        {/* <div> */}
        <CartNavbar className={isMobileOpen ? `${styles.menu_open}` : null} />
        <Navbar toggleMenu={handleActiveMenu} />
        {/* </div> */}
      </div>
    </>
  )
}

export { HamburgerMenu, MobileNavbar };