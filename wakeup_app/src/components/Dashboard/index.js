'use client';
import styles from './Dashboard.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';

const Dashboard = () => {
  return (
    <main className={styles.container}>
      <aside className={styles.container_aside}>
        <navbar className={styles.container_aside_navbar}>
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
          </ul>
        </navbar>
        <LogoutIcon />
      </aside>
      <section></section>
    </main>
  )
}

export { Dashboard }