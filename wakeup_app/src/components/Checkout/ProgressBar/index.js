import { Payment } from '@mui/icons-material';
import styles from './Progress.module.scss';

export const CheckoutProgressBar = ({ cartModale, informationModale, paymentModale }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_progress_bar}>
        <div className={cartModale ? `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_one} ${styles.active}` : `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_one}`}><span>Panier</span></div>
        <div className={informationModale ? `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_two} ${styles.active}` : `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_one}`}><span>Livraison</span></div>
        <div className={paymentModale ? `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_three} ${styles.active}` : `${styles.container_progress_bar_circle} ${styles.container_progress_bar_circle_one}`}><span>Paiement</span></div>
      </div>
    </div>
  )
}

