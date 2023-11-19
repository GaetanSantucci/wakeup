'use client';

import { Business,ButtonToScrollTop,Custom, Gift, ScrollToTop } from '@/src/components';

import { usePathname } from 'next/navigation';

export default function BusinessPage() {

  const router = usePathname();

  return (
    <>
      <ScrollToTop />
      <Business />
      <Gift />
      <Custom />
      <ButtonToScrollTop />
    </>
  )
}