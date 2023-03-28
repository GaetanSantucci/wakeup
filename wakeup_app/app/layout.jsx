import '/public/styles/reset.scss';
import '/public/styles/globals.scss';

import styles from '/public/styles/Homepage.module.scss';

import { NewHeader, CartModale, Footer, ScrollToTop, ButtonToScrollTop } from '@/src/components';

// import my redux
import { Providers } from './provider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Providers>
          <ScrollToTop />
          <NewHeader />
          <CartModale />
          {/* <Header /> */}
            <main className={styles.main}>
              {children}
            </main>
          <Footer />
          <ButtonToScrollTop />
        </Providers>
      </body>
    </html>
  )
}




