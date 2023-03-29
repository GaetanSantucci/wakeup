'use client';
import './navbar.scss';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { mainRoutes } from '@/src/routes';

// const navTitle = [{
//   slug: '/',
//   category: 'ACCUEIL'
// }, {
//   slug: '/plateau',
//   category: 'NOS PLATEAUX'
// }, {
//   slug: '/prestation',
//   category: 'NOS PRESTATIONS'
// }, {
//   slug: '/contact',
//   category: 'CONTACT'
// }];

const NewNavbar = () => {

  const router = usePathname();

  return (
    <ul className='navbar'>
      {
        mainRoutes.map((elem) => <li key={elem.category} className={router === elem.slug ? 'navbar_list is_active' : 'navbar_list'}><Link href={elem.slug}>{elem.category}</Link></li>)
      }
    </ul>
  )
}

export default NewNavbar;