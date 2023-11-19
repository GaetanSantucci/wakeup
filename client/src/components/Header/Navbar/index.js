'use client';
import './navbar.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { mainRoutes } from '@/src/routes';
import { useMediaQuery } from '@/src/hook/useMediaQuery';


const Navbar = ({ toggleMenu }) => {

  const isBreakpoint = useMediaQuery(1024) // Custom hook to check screen size, return boolean

  const router = usePathname();

  const closeMenu = () => {
    if (isBreakpoint) {
      setTimeout(() => toggleMenu(), 200)
    }
  }

  return (
    <ul className='navbar' id='menu'>
      {
        mainRoutes.map((elem) => <li key={elem.category} className={router === elem.slug ? 'navbar_list is_active' : 'navbar_list'}><Link href={elem.slug} onClick={closeMenu}>{elem.category}</Link></li>)
      }
    </ul>
  )
}

export default Navbar;