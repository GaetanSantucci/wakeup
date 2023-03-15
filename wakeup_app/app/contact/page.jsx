
import styles from '/public/styles/Homepage.module.scss';

import { Contact } from '@/components/Form';
import { Input, ScrollToTop } from '@/components';

export default function contact() {
  return (
    <>
      <ScrollToTop />
      <Contact />
    </>
  )
}