'use client';
import styles from './Page404.module.scss';
import { Croissant } from '../SVG';
import Link from 'next/link';


export const Page404 = ({ item }) => {

  return (
    <div className={styles.container}>
      {/* <Croissant /> */}
      <p className={styles.container_404}>Erreur <Croissant /> 4</p>
      <p className={styles.container_404}>Page non trouvée</p>
      <p>{item} que vous recherchez n&apos;existe pas, cliquez <Link href='/'>ici</Link> pour revenir à l&apos;accueil</p>
    </div>
  )
}