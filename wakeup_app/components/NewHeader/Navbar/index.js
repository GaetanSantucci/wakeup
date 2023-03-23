'use client';
import './navbar.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeScrollYPosition } from '@/store/reducers/settings';

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
}];

const NewNavbar = () => {

  // const dispatch = useDispatch();
  // const menuIsOpen = useSelector((state) => state.settings.menuIsOpen)
  // console.log('menuIsOpen: ', menuIsOpen);
  const router = usePathname();
  // const [isMenuActive, setIsMenuActive] = useState(false)
  // const [stickyClass, setStickyClass] = useState(null);



  // useEffect(() => {
  //   const onScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     dispatch(changeScrollYPosition(scrollPosition))
  //     scrollPosition > 180 ? setStickyClass('stickyNav') : setStickyClass(null);
  //     // if (isMenuActive) {
  //     //   setIsMenuActive(false);
  //     // }
  //   }
  // window.addEventListener('scroll', onScroll, { passive: true });
  // return () => {
  //   // remove the event listener when the component unmounts
  //   window.removeEventListener("scroll", onScroll);
  // };
  // });

  return (
    <ul className='navbar'/* {stickyClass ? 'navbar stickyNav' : 'navbar'} */>
      {
        navTitle.map((elem) => <li key={elem.category} className={router === elem.slug ? 'navbar_list is_active' : 'navbar_list'}><Link href={elem.slug}>{elem.category}</Link></li>)
      }
    </ul>
  )
}

export default NewNavbar;