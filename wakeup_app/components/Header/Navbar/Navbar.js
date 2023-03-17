'use client';
import styles from '/public/styles/Navbar.module.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const navTitle = [{
  slug: '/',
  category: 'ACCUEIL'
}, {
  slug: '/plateau',
  category: 'NOS PLATEAUX'
}, {
  slug: '/prestation',
  category: 'NOS PRESTATIONS'
}, {
  slug: '/contact',
  category: 'CONTACT'
}]



const Navbar = () => {

  const isOpen = useSelector((state) => state.settings.isOpen)
  console.log('isOpen: ', isOpen);
  const router = usePathname();
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [stickyClass, setStickyClass] = useState(null);

  const handleMenuChange = () => {
    setIsMenuActive(!isMenuActive);
  }

  useEffect(() => {

    if (!isOpen) {
      const onScroll = () => {
        const scrollPosition = window.scrollY;
        scrollPosition > 180 ? setStickyClass(`${styles.stickyNav}`) : setStickyClass(null);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  });

  // reset isMenuActive on page load
  useEffect(() => {
    setIsMenuActive(false);
  }, [router]);

  return (
    <div className={styles.header__container}>
      <div className={`${styles.header__container__navbar} ${stickyClass}`} style={isMenuActive ? { display: 'flex', transition: 'all 0.4s' } : null}>
        <ul className={styles.header__navbar__list} >
          {
            navTitle.map((elem) => <li key={elem.category} className={router === elem.slug ? `${styles.header__navbar} ${styles.is_active}` : `${styles.header__navbar}`}><Link href={elem.slug}>{elem.category}</Link></li>)
          }
        </ul>
      </div>
      <div onClick={handleMenuChange} id='nav'
        className={isMenuActive ? `${styles.nav__icon} ${styles.is__menu__active} ${styles.open}` : `${styles.nav__icon}`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div >
  )
}

export default Navbar;