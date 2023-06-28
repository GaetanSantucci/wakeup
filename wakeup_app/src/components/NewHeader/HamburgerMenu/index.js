// 'use client';
import styles from './mobileNavbar.module.scss';
import Link from 'next/link';
import logo from '/public/logo/logowakeuppng.png';
import NewNavbar from '../Navbar';



const HamburgerMenu = ({ handleActiveMenu, active }) => {

  return (
    <>
      <div class={active ? `${styles.kebab_menu} ${styles.active_menu}` : `${styles.kebab_menu}`} onClick={handleActiveMenu}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
    // <div className={styles.menu_wrapper}>
    //   <div className={styles.menu_item_kebab} tabindex="4">
    //     <div className={styles.circles}></div>
    //     <div className={styles.circles}></div>
    //     <div className={styles.circles}></div>
    //     <div className={styles.circles}></div>
    //     <div className={styles.circles}></div>
    //   </div>
    // </div>

  )
}

const MobileNavbar = ({ active }) => {
  return (
    <div className={active ? `${styles.container} ${styles.active_navbar}` : `${styles.container}`}>
      <NewNavbar />
    </div>
  )
}
// const HamburgerIcon = () => {
//   <>
//     <input type="checkbox" classNameName={styles.menu_toggle} />
//     <label classNameName={styles.trigger} for="menu-toggle"></label>
//     <label classNameName={styles.burger} for="menu-toggle"></label>
//     {/* <NewNavbar /> */}
//   </>
// }

export { HamburgerMenu, MobileNavbar };