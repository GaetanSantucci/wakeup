'use client';
import styles from './Dashboard.module.scss';

import { useLogout } from '@/src/hook/useLogout';

import LogoutIcon from '@mui/icons-material/Logout';
import { DashboardCalendar } from './Calendar';

const Dashboard = () => {

  const { logout } = useLogout();

  const userLogout = () => {
    logout();
  }

  return (
    <main className={styles.container}>
      <aside className={styles.container_aside}>
        <div className={styles.container_aside_navbar}>
          <ul>
            <li>
              Calendriers
            </li>
            <li>
              Clients
            </li>
            <li>
              Jours d&apos;ouverture
            </li>
            <li>
              Produits
            </li>
            <li>
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
        <DashboardCalendar />
      </section>
    </main>
  )
}

export { Dashboard }