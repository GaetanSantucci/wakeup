'use client';
import './header.scss'

import Link from 'next/link';
import Image from 'next/image';

import logo from '/public/logo/logowakeuppng.png';

import NewNavbar from './Navbar';
import CartNavbar from './CartNavbar';

import { useEffect, useState } from 'react';


const NewHeader = () => {

  const [stickyClass, setStickyClass] = useState(null);


  useEffect(() => {
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
      <div className={`navbar_shop ${stickyClass}`}>
        <NewNavbar />
        <CartNavbar />
      </div>
    </header>
  )
}

export default NewHeader;