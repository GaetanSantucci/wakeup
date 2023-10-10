'use client';
import styles from './Dashboard.module.scss';

import { useLogout } from '@/src/hook/useLogout';
import { useState } from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import { DashboardCalendar } from './Calendar';
import { DashboardCustomer } from './Customer';
import { DashboardProduct } from './Product';
import { DashboardBlog } from './Blog';

const Dashboard = () => {

  const { logout } = useLogout();

  const [selectedItem, setSelectedItem] = useState('calendar');

  const userLogout = () => {
    logout();
  }

  const handleNavigate = (id) => {
    setSelectedItem(id);
  };

  return (
    <main className={styles.container}>
      <aside className={styles.container_aside}>
        <div className={styles.container_aside_navbar}>
          <ul>
            <li id='calendar' onClick={() => handleNavigate('calendar')}>
              Calendriers
            </li>
            <li id='customer' onClick={() => handleNavigate('customer')}>
              Clients
            </li>
            <li id='product' onClick={() => handleNavigate('product')}>
              Produits
            </li>
            <li id='blog' onClick={() => handleNavigate('blog')}>
              Blog
            </li>
          </ul>
        </div>
        <div onClick={userLogout} className={styles.container_dashboard_logout}>
          <LogoutIcon />
          <span>Se déconnecter</span>
        </div>
      </aside>
      <section>
        {selectedItem === 'calendar' && <DashboardCalendar />}
        {selectedItem === 'customer' && <DashboardCustomer />}
        {selectedItem === 'product' && <DashboardProduct />}
        {selectedItem === 'blog' && <DashboardBlog />}
      </section>
    </main>
  )
}

export { Dashboard }