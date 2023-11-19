import '/public/styles/reset.scss';
import '/public/styles/globals.scss';

import styles from '/public/styles/Homepage.module.scss';
import { siteConfig } from '@/config/site';

import {
  Header,
  CartModale,
  Footer,
  ScrollToTop,
  ButtonToScrollTop,
} from '@/src/components';

// import my redux
import { Providers } from './provider';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary.js';

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Brunch',
    'Petit déjeuner',
    'Clermont-Ferrand',
    'Puy de Dôme',
    'Plateau Brunch',
    'Plateau petit déjeuner',
    'Livraison',
    'Séminaire',
    'Entreprise',
    'Prestation',
    'Mariage',
    'Prestation haute gamme',
    'Handmade',
    'Fait-maison',
  ],
  authors: [
    {
      name: 'Alexia Pappano',
      url: 'https://www.instagram.com/alexia_pappano/?hl=fr',
    },
    {
      name: 'Gaetan Santucci',
      url: 'https://gaetansantucci.com',
    },
  ],
  creator: ' VirtualGS',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang='fr'>
      <head />
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <CartModale />
          <main className={styles.main}>{children}</main>
          <Footer />
          <ButtonToScrollTop />
        </Providers>
      </body>
    </html>
  );
}