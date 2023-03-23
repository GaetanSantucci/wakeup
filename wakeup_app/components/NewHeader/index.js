'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/logo/logowakeuppng.png';
import NewNavbar from './Navbar';
import CartNavbar from './CartNavbar';
import './header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeScrollYPosition } from '@/store/reducers/settings';


const NewHeader = () => {

  const dispatch = useDispatch();
  // const scrollPosition = useSelector((state) => state.settings.scrollYPosition)
  // console.log('scrollPosition: ', scrollPosition);
  const [stickyClass, setStickyClass] = useState(null);


  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY;
      // dispatch(changeScrollYPosition(scrollPosition))
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
        <Image src={logo} alt='logo Wake up' className='logo' />
      </Link>
      <div className={`navbar_shop ${stickyClass}`}>
        <NewNavbar />
        <CartNavbar />
      </div>
    </header>
  )
}

export default NewHeader;