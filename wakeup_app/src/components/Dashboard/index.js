'use client';
import styles from './Dashboard.module.scss';

import { useLogout } from '@/src/hook/useLogout';

import LogoutIcon from '@mui/icons-material/Logout';

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
              Accueil
            </li>
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
          <div className={styles.container_dashboard_logout}>Se déconnecter</div>
        </div>
      </aside>
      <section></section>
    </main>
  )
}

export { Dashboard }