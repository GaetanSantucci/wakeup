'use client';
import './modale.scss';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { useSelector, useDispatch } from 'react-redux';
import { toggleModale, toggleCartModale } from '@/store/reducers/settings';

import Image from 'next/image';
import Link from 'next/link';
// import easter from '/public/images/modale-paques.webp';
import surprise from '/public/images/surprise.webp';

const EventModale = () => {

  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.settings.modaleIsOpen)
  const closeModale = () => {
    dispatch(toggleModale());
  }

  return (
    <>
      {isOpen && (
        <div className='backdrop__container'>
          <div className='modale__container'>
            <div className='modale__container__item'>
              <Image src={surprise} width={550} height={750} alt='Plateau de Pâques' />
              <div className='modale__container__item__details' >
                <div className='modale_close' onClick={closeModale}>
                  <CancelSharpIcon />
                </div>
                <h2>Tentez de remporter une pépite d&apos;or d&apos;une valeur de 425€</h2>
                <p>Participez à notre jeu concours</p>
                <h3>&laquo; GOLDEN EGG &raquo;</h3>
                <p>Tout plateau de Pâques livré entre le 1er et le 30 avril 2023</p>
                <p className='modale__container__item__details__equal'>=</p>
                <p>Une chance d&apos;être tiré au sort pour remporter une pépite d&apos;or de 3,17gr</p>
                <span onClick={closeModale}><Link href='/plateau/paques/10'>En savoir plus</Link></span>
                <Link href='/images/jeuconcourspaques.pdf' target='blank' onClick={closeModale}><code>Voir les conditions générales du jeu concours</code></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
const CartModale = () => {
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.settings.cartIsOpen)
  const closeModale = () => {
    dispatch(toggleCartModale());
  }
  return (
    <div className={cartOpen ? 'cart_modale open_cart_modale' : 'cart_modale'}>
      <div className='modale_close' onClick={closeModale}>
        <CancelSharpIcon />
      </div>
      <h3>Votre panier </h3>

      <p>Détail</p>
      <div className='cart_modale_item'>
        <p>plateau sunshine</p>
        <span>29.90e</span>
        <div className='cart_modale_quantity'>
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </div>
      </div>
      <div className='cart_modale_item'>
        <p>plateau dolce vita</p>
        <span>49.90e</span>
        <div className='cart_modale_quantity'>
          <span>-</span>
          <span>1</span>
          <span>+</span>
        </div>
      </div>
      <p>total : 78.90</p>
      <button>Validez</button>
    </div>
  )
}

export { EventModale, CartModale }