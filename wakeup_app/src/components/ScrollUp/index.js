'use client'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import styles from './Scroll.module.scss';

import { useEffect, useState } from 'react'
import { useScratch } from 'react-use';

const ScrollUp = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo({
    top: 160,
    left: 0,
    behavior: 'smooth'
  }), [])

  return null
}

const ScrollToTop = () => {
  useEffect(() => window.document.scrollingElement?.scrollTo(0, 0), [])

  return null
}

const ButtonToScrollTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [isButtonScroll, setIsButtonScroll] = useState(false)
  console.log('isButtonScroll:', isButtonScroll);
  // console.log('screenHeight:', screenHeight);
  // console.log('scrollPosition:', scrollPosition);

  const handleScroll = () => {
    const userScreen = window.innerHeight;
    const position = window.scrollY;
    setScreenHeight(userScreen);
    setScrollPosition(position);
  };

  const goToTop = () => {
    window.document.scrollingElement?.scrollTo(0, 0)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {
        scrollPosition > screenHeight ? <div className={styles.btn_scrollTop} onClick={goToTop}><ArrowBackIosOutlinedIcon /><ArrowDropUpOutlinedIcon /></div> : null
      }
    </>
  )
}

export { ScrollToTop, ScrollUp, ButtonToScrollTop }