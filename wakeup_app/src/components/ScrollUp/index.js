'use client'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import styles from './Scroll.module.scss';

import { useEffect } from 'react'

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
  return (
    <div className={styles.btn_scrollTop} onClick={() => window.document.scrollingElement?.scrollTo(0, 0)}><ArrowBackIosOutlinedIcon /><ArrowDropUpOutlinedIcon /></div>
  )
}

export { ScrollToTop, ScrollUp, ButtonToScrollTop }