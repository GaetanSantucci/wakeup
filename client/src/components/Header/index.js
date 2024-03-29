'use client';
import './header.scss'

import Link from 'next/link';
import Image from 'next/image';

import logo from '/public/logo/logowakeuppng.png';

import Navbar from './Navbar';
import CartNavbar from './CartNavbar';

import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { useMediaQuery } from '@/src/hook/useMediaQuery';

import { MobileNavbar } from './HamburgerMenu';


const Header = () => {
  const isBreakpoint = useMediaQuery(1024) // Custom hook to check screen size, return boolean

  // const isLoginModale = useSelector((state) => state.settings.toggleLoginModale)

  const [stickyClass, setStickyClass] = useState(null);

  useEffect(() => {
    // Methods to fixed header on scroll
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      scrollPosition > 130 ? setStickyClass('fixed') : setStickyClass(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      // remove the event listener when the component unmounts
      window.removeEventListener("scroll", onScroll);
    };
  })

  return (
    <header className='header'>
      <Link legacyBehavior href='/'>
        <Image src={logo} alt='logo Wake up' className='logo' priority />
      </Link>
      {
        isBreakpoint ? <MobileNavbar /> :
          <div className={`navbar_shop ${stickyClass}`}>
            <Navbar />
            <CartNavbar />
          </div>
      }

    </header>
  )
}

export default Header;